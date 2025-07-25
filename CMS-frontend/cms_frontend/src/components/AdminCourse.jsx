import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import '../styles/AdminCourses.css'; // CSS for admin course listing
import { toast } from 'react-toastify';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchCourses = () => {
    setLoading(true);
    fetch(`http://localhost:8080/courses/createdBy/${userId}`, {
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
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (courseId) => {
    fetch(`http://localhost:8080/courses/${courseId}`, {
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
        fetchCourses();
      })
      .catch((err) => {
        console.error('Delete error:', err);
        toast.error("Failed to delete course");
      });
  };

  useEffect(() => {
    if (!userId || !token) {
      toast.error('Please log in as admin to view your courses');
      setLoading(false);
      return;
    }

    fetchCourses();
  }, [userId, token]);

  return (
    <>
      <AdminHeader />
      <div className="admin-course-container">
        <h2 className="admin-course-heading">Courses Created By You</h2>

        {loading ? (
          <p className="admin-course-loading">Loading courses...</p>
        ) : error ? (
          <p className="admin-course-error">Error: {error}</p>
        ) : courses.length === 0 ? (
          <p className="admin-course-loading">You haven't created any courses yet.</p>
        ) : (
          <div className="admin-course-grid">
            {courses.map((course) => (
              <div className="admin-course-card" key={course.id}>
                <h3>{course.title}</h3>
                <p><strong>Duration:</strong> {course.durationInHours} hrs</p>
                <p><strong>Price:</strong> ₹{course.coursePrice}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <button
                  className="delete-course-button"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCourses;
