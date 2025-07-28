package com.example.springbootfirst.repository;

import com.example.springbootfirst.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.springbootfirst.models.RegisterDetails;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);

    long countByInstructorId(Long instructorId);

}
