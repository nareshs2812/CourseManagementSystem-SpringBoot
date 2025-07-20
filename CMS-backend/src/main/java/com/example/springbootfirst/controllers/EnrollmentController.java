package com.example.springbootfirst.controllers;

import com.example.springbootfirst.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.springbootfirst.payload.EnrollmentRequest;
import java.util.List;
import com.example.springbootfirst.models.Enrollment;


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

}
