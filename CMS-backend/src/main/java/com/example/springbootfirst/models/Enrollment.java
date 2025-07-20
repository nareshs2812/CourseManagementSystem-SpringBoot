package com.example.springbootfirst.models;

import jakarta.persistence.*;

@Entity
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Add this missing user field
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterDetails user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    public Enrollment() {
    }

    public Enrollment(RegisterDetails user, Course course) {
        this.user = user;
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public RegisterDetails getUser() {
        return user;
    }

    public void setUser(RegisterDetails user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
