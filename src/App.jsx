import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; //Import necessary components
import LoginPage from './Component/Loginpage.jsx'; // Adjust the casing of component names to match file names
import SignupPage from './Component/SignupPage';
import HomePage from './Component/HomePage'; // Ensure you create this component
import './App.css'; // Import the CSS
import About from './Component/About.jsx';
import Attendance from './Component/Attendance.jsx';
import Timetable from './Component/Timetable.jsx';
import Announcements from './Component/Announcements.jsx';
import CalendarEvents from './Component/CalendarEvents.jsx';
import AdminDashboard from './Component/AdminDashboard.jsx';
import AdminLoginPage from './Component/AdminLoginPage.jsx';


function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="page-content">
          <Routes>
            {/* Define routes */}
            <Route className='style' path="/" element={<LoginPage />} /> {/* Default route */}
            <Route className='style' path="/signup" element={<SignupPage />} /> {/* Signup route */}
            <Route path="/home" element={<HomePage />} /> {/* Home route */}
            <Route path='/About' element={<About />} />
            <Route path='/Attendance' element={<Attendance />} />
            <Route path='/Timetable' element={<Timetable />} />
            <Route path='/Announcements' element={<Announcements />} />
            <Route path='/calendar' element={<CalendarEvents />} />
            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin-login' element={<AdminLoginPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



