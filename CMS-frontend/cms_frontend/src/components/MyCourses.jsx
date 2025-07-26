import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../styles/MyCourses.css'; 
import { toast } from 'react-toastify';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchEnrollments = () => {
    setLoading(true);
    fetch(`http://localhost:8080/enrollments/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!userId || !token) {
      toast.error('Please log in to view your enrolled courses');
      setLoading(false);
      return;
    }

    fetchEnrollments();
  }, [userId, token]);

  const handleDelete = (enrollmentId) => {
    fetch(`http://localhost:8080/enrollments/${enrollmentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting: ${response.status}`);
        }
        return response.text();
      })
      .then((message) => {
        toast.success(message);
        fetchEnrollments();
      })
      .catch((err) => {
        console.error('Delete error:', err);
        toast.error("Failed to delete enrollment");
      });
  };

  return (
    <>
      <Header />
      <div className="course-container">
        <h2 className="course-heading">My Enrolled Courses</h2>

        {loading ? (
          <p className="course-loading">Loading your courses...</p>
        ) : error ? (
          <p className="course-error">Error: {error}</p>
        ) : enrollments.length === 0 ? (
          <p className="course-loading">You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="course-grid">
            {enrollments.map((enrollment) => (
              <div className="course-card" key={enrollment.id}>
                <h3>{enrollment.course.title}</h3>
                <p><strong>Instructor:</strong> {enrollment.course.instructorName}</p>
                <p><strong>Duration:</strong> {enrollment.course.durationInHours} hrs</p>
                <p><strong>Price:</strong> {enrollment.course.coursePrice}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(enrollment.id)}
                >
                  Unenroll
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;
 