package com.example.springbootfirst.services;

import com.example.springbootfirst.models.Course;
import com.example.springbootfirst.models.Enrollment;
import com.example.springbootfirst.models.RegisterDetails;
import com.example.springbootfirst.repository.CourseRepository;
import com.example.springbootfirst.repository.EnrollmentRepository;
import com.example.springbootfirst.repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private RegisterDetailsRepository registerRepository;

    public String enrollUserInCourse(Long userId, Long courseId) {
        Optional<RegisterDetails> userOpt = registerRepository.findById(userId.intValue());
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (userOpt.isEmpty() || courseOpt.isEmpty()) {
            return "User or Course not found";
        }

        Enrollment enrollment = new Enrollment(userOpt.get(), courseOpt.get());
        enrollmentRepository.save(enrollment);

        return "Enrollment successful!";
    }

    public List<Enrollment> getEnrollmentsForUser(Long userId) {
        RegisterDetails user = registerRepository.findById(userId.intValue())
            .orElseThrow(() -> new RuntimeException("User not found"));

        return enrollmentRepository.findByUser(user);
    }

    public List<Enrollment> getEnrollmentsByUser(RegisterDetails user) {
    return enrollmentRepository.findByUser(user); 
    }
}
