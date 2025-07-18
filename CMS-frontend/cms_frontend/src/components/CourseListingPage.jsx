import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../styles/CourseListingPage.css';

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
                <button className="course-btn">View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseListingPage;
