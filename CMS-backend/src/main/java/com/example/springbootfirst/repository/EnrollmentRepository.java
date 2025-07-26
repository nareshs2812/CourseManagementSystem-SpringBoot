package com.example.springbootfirst.repository;

import com.example.springbootfirst.models.Course;
import com.example.springbootfirst.models.Enrollment;
import com.example.springbootfirst.models.RegisterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(RegisterDetails user);

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.courseId = :courseId")
    int countByCourseId(@Param("courseId") Long courseId);
}
