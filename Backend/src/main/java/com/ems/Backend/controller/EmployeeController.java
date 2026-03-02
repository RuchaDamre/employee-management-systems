package com.ems.Backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.util.*;
import com.ems.Backend.service.EmployeeService;
import com.ems.Backend.model.Employee;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController (EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {
      return new ResponseEntity<>(service.getEmployees(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
        Employee employee = service.getEmployeeById(id);
        if(employee != null)
            return new ResponseEntity<>(employee, HttpStatus.OK);
        else 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> addEmployee(@ModelAttribute Employee emp, @RequestParam("img") MultipartFile imageFile) {
       
        try {
            return new ResponseEntity<>(service.addEmployee(emp, imageFile), HttpStatus.CREATED);
        }
        catch (Exception e) {
             return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{employeeID}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int employeeID) {
        Employee employee = service.getEmployeeById(employeeID);
        byte[] imageFile = employee.getImageData();
        if (employee == null || employee.getImageData() == null) {
        if (employee.getImageType()==null) {
             employee.setImageType("image/jpeg");
        }
        
        return ResponseEntity.notFound().build();
    }
        return ResponseEntity.ok().contentType(MediaType.valueOf(employee.getImageType())).body(imageFile);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<String> updateEmployee(@PathVariable int employeeId, @RequestBody Employee emp) {
       
           Employee employee = service.updateEmployee(employeeId, emp);
        if(employee != null) {
            return new ResponseEntity<>("Updated", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
    return service.getDashboardStats();
   }

    @DeleteMapping("/{Id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int Id) {
     boolean employee = service.deleteEmployee(Id);
      if(employee) {
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Failed to delete", HttpStatus.BAD_REQUEST);
        }
    }

}