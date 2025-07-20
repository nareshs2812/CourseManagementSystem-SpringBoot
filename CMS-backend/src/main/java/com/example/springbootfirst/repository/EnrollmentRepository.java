package com.example.springbootfirst.repository;

import com.example.springbootfirst.models.Enrollment;
import com.example.springbootfirst.models.RegisterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(RegisterDetails user);  // Add this method
}
