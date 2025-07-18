package com.example.springbootfirst.models;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id") // explicitly map to DB column
    private Long courseId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "instructor_name") // map to DB column
    private String instructorName;

    @Column(name = "duration_in_hours") // map to DB column
    private int durationInHours;

    public Course() {}

    public Course(Long courseId, String title, String description, String instructorName, int durationInHours) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.instructorName = instructorName;
        this.durationInHours = durationInHours;
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

    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", instructorName='" + instructorName + '\'' +
                ", durationInHours=" + durationInHours +
                '}';
    }
}
