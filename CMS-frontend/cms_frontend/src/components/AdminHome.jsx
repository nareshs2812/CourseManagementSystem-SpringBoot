import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminHome.css';
import AdminHeader from './AdminHeader';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  return (
    <>
    <AdminHeader />
    <div className="admin-home-container">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-welcome">
            <h2>Welcome, Administrator</h2>
            <p>Manage your courses and content effectively. Monitor your platform's performance and growth.</p>
          </div>
        </div>

        <div className="admin-actions">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleCreateCourse}
            className="create-course-btn"
          >
            <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i>
            Create New Course
          </Button>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Courses</h3>
              <div className="stat-value">48</div>
              <div className="stat-label">Active Courses</div>
            </div>
            <div className="stat-card">
              <h3>Registered Users</h3>
              <div className="stat-value">1,245</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <h3>Enrollments</h3>
              <div className="stat-value">3,456</div>
              <div className="stat-label">Active Enrollments</div>
            </div>
            <div className="stat-card">
              <h3>Revenue</h3>
              <div className="stat-value">₹45,678</div>
              <div className="stat-label">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminHome;