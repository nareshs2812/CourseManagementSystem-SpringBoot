package com.example.springbootfirst.models;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "instructor_name", nullable = false)
    private String instructorName;

    @Column(name = "duration_in_hours")
    private int durationInHours;

    @Column(name = "course_price")
    private double coursePrice;

    @Column(name = "instructor_id", nullable = false)
    private Long instructorId;

    // Default constructor
    public Course() {}

    // Parameterized constructor
    public Course(Long courseId, String title, String description, String instructorName,
                  int durationInHours, double coursePrice, Long instructorId) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.instructorName = instructorName;
        this.durationInHours = durationInHours;
        this.coursePrice = coursePrice;
        this.instructorId = instructorId;
    }

    public Long getCourseId() {
        return courseId;
    }
    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructorName() {
        return instructorName;
    }
    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public int getDurationInHours() {
        return durationInHours;
    }
    public void setDurationInHours(int durationInHours) {
        this.durationInHours = durationInHours;
    }

    public double getCoursePrice() {
        return coursePrice;
    }
    public void setCoursePrice(double coursePrice) {
        this.coursePrice = coursePrice;
    }

    public Long getInstructorId() {
        return instructorId;
    }
    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", instructorName='" + instructorName + '\'' +
                ", durationInHours=" + durationInHours +
                ", coursePrice=" + coursePrice +
                ", instructorId=" + instructorId +
                '}';
    }
}
