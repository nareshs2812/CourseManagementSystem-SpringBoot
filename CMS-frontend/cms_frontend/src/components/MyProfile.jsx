import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyProfile.css';

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) return;

        setUser(storedUser);

        if (storedUser.role === 'ROLE_ADMIN') {
          const response = await axios.get(`http://localhost:8080/courses/createdBy/${storedUser.id}`);
          setCourseCount(response.data.length);
        } else if (storedUser.role === 'ROLE_USER') {
          const response = await axios.get(`http://localhost:8080/enrollments/user/${storedUser.id}`);
          setCourseCount(response.data.length);
        }
      } catch (error) {
        console.error('Error fetching profile info:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-item">
        <strong>Username:</strong> {user.userName}
      </div>
      <div className="profile-item">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="profile-item">
        <strong>Role:</strong> {user.role?.replace('ROLE_', '')}
      </div>
      <div className="profile-item">
        <strong>
          {user.role === 'ROLE_ADMIN' ? 'Courses Created:' : 'Courses Enrolled:'}
        </strong>{' '}
        {courseCount}
      </div>
    </div>
  );
};

export default MyProfile;
