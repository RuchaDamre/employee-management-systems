package com.ems.Backend.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int empid;
    private String name;
    private String email;
    private String role;
    private double salary;
    private LocalDate dob;
    private String gender;
    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageData;

    public Employee() {}

    public Employee(int id, String name, String email, String role, double salary, int empid, LocalDate dob, String gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.salary = salary;
        this.empid = empid;
        this.gender = gender;
        this.dob = dob;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public int getEmpid() { return empid; }
    public void setEmpid(int empid) { this.empid = empid; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { this.imageData = imageData; }
}