package com.ems.Backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ems.Backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
   @Query("SELECT COUNT(e), SUM(e.salary) FROM Employee e")
   Object getDashboardStats();
}