package com.example.springbootfirst.controllers;

import com.example.springbootfirst.services.EnrollmentService;
import com.example.springbootfirst.payload.EnrollmentRequest;
import com.example.springbootfirst.models.Enrollment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public String enrollUser(@RequestBody EnrollmentRequest request) {
        return enrollmentService.enrollUserInCourse(request.getUserId(), request.getCourseId());
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getEnrollmentsByUser(@PathVariable Long userId) {
        return enrollmentService.getEnrollmentsForUser(userId);
    }

    @DeleteMapping("/{enrollmentId}")
    public String deleteEnrollment(@PathVariable Long enrollmentId) {
        return enrollmentService.deleteEnrollmentById(enrollmentId);
    }

    // ✅ Correct mapping for retrieving all enrollments
    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }
}
