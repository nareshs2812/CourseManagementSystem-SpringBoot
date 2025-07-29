import React, { useState } from 'react';
import '../styles/AddCourse.css';
import { toast } from 'react-toastify';
import AdminHeader from './AdminHeader';

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructorName: '',
    durationInHours: '',
    coursePrice: ''
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      toast.error('You must be logged in to create a course');
      return;
    }

    const newCourse = {
      ...course,
      durationInHours: parseInt(course.durationInHours),
      coursePrice: parseFloat(course.coursePrice),
      instructorId: parseInt(userId)
    };

    try {
      const response = await fetch('http://localhost:8080/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      toast.success('Course added successfully!');
      setCourse({
        title: '',
        description: '',
        instructorName: '',
        durationInHours: '',
        coursePrice: ''
      });
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Error adding course');
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="add-course-container">
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit} className="add-course-form">
          <input
            type="text"
            name="title"
            value={course.title}
            placeholder="Course Title"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={course.description}
            placeholder="Course Description"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="instructorName"
            value={course.instructorName}
            placeholder="Instructor Name"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="durationInHours"
            value={course.durationInHours}
            placeholder="Duration (hours)"
            onChange={handleChange}
            required
            min="1"
          />
          <input
            type="number"
            step="0.01"
            name="coursePrice"
            value={course.coursePrice}
            placeholder="Course Price (₹)"
            onChange={handleChange}
            required
            min="0"
          />
          <button type="submit">Create Course</button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
