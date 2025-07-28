import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminHome.css';
import AdminHeader from './AdminHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUserGraduate, faBookOpen, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/addcourse');
  };

  const courseCategories = [
    { 
      id: 1, 
      name: 'Programming', 
      icon: 'fa-laptop-code', 
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format' 
    },
    { 
      id: 2, 
      name: 'Data Science', 
      icon: 'fa-database', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQesynHzOBv4W3hwcjEdV6QPhoIzXfQK8-Aig&s' 
    },
    { 
      id: 3, 
      name: 'Web Development', 
      icon: 'fa-code', 
      image: 'https://thumbs.dreamstime.com/b/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.jpg' 
    },
    { 
      id: 4, 
      name: 'AI & ML', 
      icon: 'fa-robot', 
      image: 'https://media.istockphoto.com/id/966248982/photo/robot-with-education-hud.jpg?s=612x612&w=0&k=20&c=9eoZYRXNZsuU3edU87PksxN4Us-c9rB6IR7U_IGZ-U8=' 
    },
    { 
      id: 5, 
      name: 'Business', 
      icon: 'fa-chart-line', 
      image: 'https://thumbs.dreamstime.com/b/businessman-using-tablet-laptop-analyzing-sales-data-economic-growth-graph-chart-business-strategy-digital-marketing-154742021.jpg' 
    },

  ];

  return (
    <>
      <AdminHeader />
      <div className="admin-home-container">
        <div className="admin-dashboard">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <div className="admin-welcome">
              <h2>Welcome, Administrator</h2>
              <p className="welcome-message">Manage your courses and content effectively. Monitor your platform's performance and growth.</p>
            </div>
          </div>

          <div className="admin-actions">
            <div className="action-card create-course-card">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleCreateCourse}
                className="create-course-btn"
              >
                <FontAwesomeIcon icon="fa-plus-circle" style={{ marginRight: '8px' }} />
                Create New Course
              </Button>
            </div>

            {/* <div className="admin-stats">
              <div className="stat-card">
                <FontAwesomeIcon icon={faBookOpen} className="stat-icon" />
                <h3>Total Courses</h3>
                <div className="stat-value">48</div>
                <div className="stat-label">Active Courses</div>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faUserGraduate} className="stat-icon" />
                <h3>Registered Users</h3>
                <div className="stat-value">1,245</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
                <h3>Enrollments</h3>
                <div className="stat-value">3,456</div>
                <div className="stat-label">Active Enrollments</div>
              </div>
              <div className="stat-card">
                <FontAwesomeIcon icon={faMoneyBillWave} className="stat-icon" />
                <h3>Revenue</h3>
                <div className="stat-value">₹45,678</div>
                <div className="stat-label">This Month</div>
              </div>
            </div> */}

            <div className="course-categories">
              <h2>Course Categories</h2>
              <div className="category-grid">
                {courseCategories.map((category) => (
                  <div key={category.id} className="category-card">
                    <img src={category.image} alt={category.name} className="category-image" />
                    <div className="category-content">
                      <FontAwesomeIcon icon={category.icon} className="category-icon" />
                      <h3>{category.name}</h3>
                      <p>Manage courses in this category</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;