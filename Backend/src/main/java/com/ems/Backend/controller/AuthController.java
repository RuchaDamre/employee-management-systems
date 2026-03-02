package com.ems.Backend.controller;

import com.ems.Backend.dto.LoginRequest;
import com.ems.Backend.dto.LoginResponse;
import com.ems.Backend.model.Admin;
import com.ems.Backend.repository.AdminRepository;
import com.ems.Backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private AdminRepository adminRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public AuthController(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("Login attempt for: " + request.getEmail());

        Admin admin = adminRepository.findByEmail(request.getEmail());

        if (admin == null) {
            return ResponseEntity.status(401).body("Invalid email");
        }

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        String token = jwtUtil.generateToken(admin.getEmail());

        return ResponseEntity.ok(new LoginResponse(token, admin.getEmail()));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(
        @RequestHeader(value = "Authorization", required = false) String header) {

    try {

        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid token format");
        }

        String token = header.substring(7);
        String email = jwtUtil.extractEmail(token);

        return ResponseEntity.ok(
                java.util.Map.of("email", email)
        );

    } catch (Exception e) {
        return ResponseEntity.status(401).body("Token invalid or expired");
    }
}
}