import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import '../styles/AdminCourses.css';
import { toast } from 'react-toastify';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [enrollmentCounts, setEnrollmentCounts] = useState({});

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchEnrollmentCount = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/enrollments/count/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch enrollment count');
      return await response.json();
    } catch (error) {
      console.error('Error fetching enrollment count:', error);
      return 0;
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/courses/createdBy/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setCourses(data);

      const countMap = {};
      for (let course of data) {
        const count = await fetchEnrollmentCount(course.courseId);
        countMap[course.courseId] = count;
      }
      setEnrollmentCounts(countMap);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
    setLoading(false);
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
        if (!response.ok) throw new Error(`Error deleting: ${response.status}`);
        return response.text();
      })
      .then(() => {
        toast.success("Course deleted successfully!");
        fetchCourses();
      })
      .catch((err) => {
        console.error('Delete error:', err);
        toast.error("Failed to delete course");
      });
  };

  const handleEditClick = (course) => {
    setEditingCourse(course.courseId);
    setUpdatedCourse({ ...course });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = () => {
    fetch(`http://localhost:8080/courses/${editingCourse}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Update failed: ${response.status}`);
        return response.json();
      })
      .then(() => {
        toast.success("Course updated successfully!");
        setEditingCourse(null);
        fetchCourses();
      })
      .catch((err) => {
        console.error('Update error:', err);
        toast.error("Failed to update course");
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
              <div className="admin-course-card" key={course.courseId}>
                {editingCourse === course.courseId ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={updatedCourse.title}
                      onChange={handleUpdateChange}
                      placeholder="Title"
                    />
                    <input
                      type="number"
                      name="durationInHours"
                      value={updatedCourse.durationInHours}
                      onChange={handleUpdateChange}
                      placeholder="Duration"
                    />
                    <input
                      type="number"
                      name="coursePrice"
                      value={updatedCourse.coursePrice}
                      onChange={handleUpdateChange}
                      placeholder="Price"
                    />
                    <textarea
                      name="description"
                      value={updatedCourse.description}
                      onChange={handleUpdateChange}
                      placeholder="Description"
                    />
                    <div className="button-row">
                      <button onClick={handleUpdateSubmit}>Save</button>
                      <button onClick={() => setEditingCourse(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{course.title}</h3>
                    <p><strong>Duration:</strong> {course.durationInHours} hrs</p>
                    <p><strong>Price:</strong> ₹{course.coursePrice}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <p><strong>Enrolled Users:</strong> {enrollmentCounts[course.courseId] || 0}</p>
                    <div className="button-row">
                      <button className="delete-course-button" onClick={() => handleDelete(course.courseId)}>Delete</button>
                      <button className="update-course-button" onClick={() => handleEditClick(course)}>Update</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCourses;
