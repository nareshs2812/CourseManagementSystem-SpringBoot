import React from 'react';
import '../styles/LandingPage.css';


const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <nav className="navbar">
        <div className="nav-logo">CourseSphere</div>
        <div className="nav-links">
          <a href="/login" className="kar">Login</a>
          <a href="/register" className="kar">Register</a>
          <a href="/about" className="kar">About US</a>
          <a href="/contact" className="kar">Contact</a>
        </div>
      </nav>

      <div className="landing-main">
        <div className="landing-left">
          <h1><span>Empower</span><br />Modern Education</h1>
          <p>A complete platform for schools, colleges, and educators<br />to manage courses and engage students better.</p>
          <div className="landing-buttons">
          <a href="/login"><button className="btn-outline">GET STARTED</button></a>
          </div>
        </div>
        <div className="landing-right">
          <img src="/books-illustration.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
