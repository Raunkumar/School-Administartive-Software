import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './TeacherNavbar.css';
import About from './About';


const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`admin-navbar ${isOpen ? 'open' : ''}`}>
      <div className="admin-header" onClick={toggleNavbar}>
        <div className="hamburger">
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
        
      </div>
      {isOpen && (
        <ul className="admin-navbar-links">
          <li><Link to="/teacher-home">Home</Link></li>
          <li><Link to="/TeacherAttendance">Attendance</Link></li>
          <li><Link to="/About" >About</Link></li>
          <li><Link to="/Announcements">Announcement</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      )}

    </div>
  );
};

export default AdminNavbar;
