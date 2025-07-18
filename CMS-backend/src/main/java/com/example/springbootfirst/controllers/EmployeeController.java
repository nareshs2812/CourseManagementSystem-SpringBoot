package com.example.springbootfirst.controllers;

import com.example.springbootfirst.models.Employee;
import com.example.springbootfirst.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public String route() {
        return "Welcome to SpringBoot Security";
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getMethod();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{empID}")
    public Employee getEmployeeById(@PathVariable int empID) {
        return employeeService.getEmployeeById(empID);
    }

    @GetMapping("/job/{job}")
    public List<Employee> getEmployeeByJob(@PathVariable String job) {
        return employeeService.getEmployeeByJob(job);
    }

    @PostMapping
    public String addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @PutMapping("/{empID}")
    public String updateEmployee(@PathVariable int empID, @RequestBody Employee updatedEmployee) {
        return employeeService.updateEmployeeById(empID, updatedEmployee);
    }

    @DeleteMapping("/{empID}")
    public String deleteEmployee(@PathVariable int empID) {
        return employeeService.deleteEmployeeById(empID);
    }
}
