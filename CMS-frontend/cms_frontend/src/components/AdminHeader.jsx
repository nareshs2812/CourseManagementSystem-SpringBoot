import React from 'react';
import '../styles/AdminHeader.css';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-logo">
        <i className="fas fa-crown admin-logo-icon"></i>
        <span>CourseSphere</span>
      </div>
      
      <div className="admin-nav-links">
        <a href="/adminhome" class="kar">Dashboard</a>
        <a href="/admincourse" class="kar">Courses</a>
        <a href="/profileAdmin" class="kar">Profile</a>
        <a href="/" class="kar">Logout</a>
      </div>
    </nav>
  );
};

export default AdminHeader;