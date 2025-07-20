import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../styles/CourseListingPage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async (courseId) => {
    if (!userId) {
      toast.error('Please login to enroll in a course');
      return;
    }

    setEnrolling(true);
    try {
      const response = await fetch(`http://localhost:8080/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          courseId: courseId,
          enrollmentDate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to enroll in course');
      }

      toast.success('Successfully enrolled in course!');
      navigate('/mycourses');
    } catch (error) {
      toast.error('Failed to enroll in course. Please try again.');
      console.error('Enrollment error:', error);
    } finally {
      setEnrolling(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    
    fetch('http://localhost:8080/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="course-container">
        <h2 className="course-heading">All Courses</h2>

        {loading ? (
          <p className="course-loading">Loading courses...</p>
        ) : error ? (
          <p className="course-error">Error: {error}</p>
        ) : (
          <div className="course-grid">
            {courses.map(course => (
              <div className="course-card" key={course.courseId}>
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructorName}</p>
                <p><strong>Duration:</strong> {course.durationInHours} hrs</p>
                <div className="course-actions">
                  <button className="course-btn">View Details</button>
                  <button 
                    className="course-btn enroll-btn" 
                    onClick={() => handleEnroll(course.courseId)}
                    disabled={!userId}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseListingPage;
