import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      setStudentData(user);
    } else {
      // If no user is found in localStorage, redirect to login
      window.location.href = '/login';
    }
  }, []);

  if (!studentData) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Student Profile</h2>
      </div>

      <div className="profile-info">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-img"
          />
        </div>

        <div className="student-details">
          <p><strong>Roll No:</strong> {studentData.rollNo}</p>
          <p><strong>Standard:</strong> {studentData.standard}th</p>
          <p><strong>Email:</strong> {studentData.email}</p>
        </div>
      </div>

      <div className="profile-footer">
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/';
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
