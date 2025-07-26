import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/CourseDetails.css';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/${courseId}`)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  const handleEnroll = async () => {
    if (!userId) {
      toast.error("Please log in to enroll.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          courseId,
          enrollmentDate: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success("Successfully enrolled in the course!");
        navigate('/mycourses');
      } else if (response.status === 409) {
        toast.warning("You are already enrolled in this course.");
      } else {
        toast.error("Enrollment failed. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Header />
      <div className="course-detail-container">
        {loading ? (
          <p>Loading course details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : course ? (
          <div className="course-detail-card">
            <h2>{course.title}</h2>
            <p><strong>Instructor:</strong> {course.instructorName}</p>
            <p><strong>Duration:</strong> {course.durationInHours} hrs</p>
            <p><strong>Price:</strong> ₹{course.coursePrice}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <button
              className="course-btn enroll-btn"
              onClick={handleEnroll}
              disabled={!userId}
            >
              Enroll Now
            </button>
          </div>
        ) : (
          <p>Course not found.</p>
        )}
      </div>
    </>
  );
};

export default CourseDetails;
