import React from 'react';
import '../styles/AboutUs.css';
import Header from './Header';

const AboutUs = () => {
  return (
    <>
    <Header/>
    <div className="about-container">
      <div className="about-header">
        <h1>About CourseSphere</h1>
        <p>Transforming Education with Modern Course Management</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>CourseSphere aims to revolutionize the way education is managed and delivered. We provide a modern, user-friendly platform that simplifies course management for institutions, teachers, and students.</p>
        </div>

        <div className="features">
          <div className="feature">
            <h3>Course Management</h3>
            <p>Effortlessly create, manage, and organize courses</p>
          </div>
          <div className="feature">
            <h3>Student Management</h3>
            <p>Track student progress and manage enrollments</p>
          </div>
          <div className="feature">
            <h3>Content Management</h3>
            <p>Upload and share educational materials</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Contact Us</h2>
          <p>For more information or to get started, please contact us at:</p>
          <div className="contact-info">
            <p>Email: support@coursesphere.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;