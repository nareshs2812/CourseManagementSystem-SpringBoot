package com.example.springbootfirst.controllers;

import com.example.springbootfirst.models.Course;
import com.example.springbootfirst.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

    @GetMapping("/{id}")
    public Optional<Course> getCourse(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return "Course with ID " + id + " deleted successfully.";
    }

    @GetMapping("/createdBy/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable Long instructorId) {
        return courseService.getCoursesByInstructorId(instructorId);
    }

    @GetMapping("/count/instructor/{instructorId}")
    public ResponseEntity<Long> countCoursesByInstructorId(@PathVariable Long instructorId) {
        long count = courseService.countCoursesByInstructorId(instructorId);
        return ResponseEntity.ok(count);
    }

}
