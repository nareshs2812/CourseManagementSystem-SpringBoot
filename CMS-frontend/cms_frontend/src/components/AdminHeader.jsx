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
        <span>Admin Portal</span>
      </div>
      
      <div className="admin-nav-links">
        <a href="/adminhome" className="active">Dashboard</a>
        <a href="/admincourse">Courses</a>
        <a href="/users">Users</a>
        <a href="/settings">Settings</a>
        <a href="/reports">Reports</a>
      </div>

      <div className="admin-nav-actions">
        <div className="admin-profile">
          <i className="fas fa-user-circle"></i>
          <span>Admin</span>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;