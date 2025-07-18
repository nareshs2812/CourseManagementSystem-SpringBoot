import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">CourseSphere</div>
      <div className="nav-links">
        <a href="/" className="">Home</a>
        <a href="/">My Courses</a>
        <a href="#contact">Contact</a>
        <a href="/">Logout</a>
      </div>
    </nav>
  );
};

export default Header;