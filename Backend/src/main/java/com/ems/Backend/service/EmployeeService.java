package com.ems.Backend.service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import com.ems.Backend.repository.EmployeeRepository;
import com.ems.Backend.model.Employee;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService (EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getEmployees () {
        return repo.findAll();
    }

     public Employee getEmployeeById (int id) {
        return repo.findById(id).orElse(null);
    }

    public Employee addEmployee(Employee emp, MultipartFile imageFile) throws IOException {
        emp.setImageName(imageFile.getOriginalFilename());
        emp.setImageType(imageFile.getContentType());
        emp.setImageData(imageFile.getBytes());
        return repo.save(emp);
    }

     public Employee updateEmployee (int id, Employee emp) {
        if (repo.existsById(id)) {
        emp.setId(id);  
        return repo.save(emp);
    }

    return null;
    }

    public Map<String, Object> getDashboardStats() {

    Object result = repo.getDashboardStats();

    Object[] data = (Object[]) result; 
    Map<String, Object> stats = new HashMap<>();

    stats.put("totalEmployees", data[0]);
    stats.put("totalSalary", data[1]);

    return stats;
}

 public boolean deleteEmployee (int id) {
        if (repo.existsById(id)) {
        repo.deleteById(id);
        return true;
    }
    return false;
}
}