import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [standard, setStandard] = useState('');
  const [rollNo, setRollNo] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, standard, rollNo }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, alert the user and navigate to the home page (or dashboard)
        alert('Login successful');
        navigate('/home'); // Redirect to the home page (or another page like "/dashboard")
      } else {
        // If there is an error (e.g., wrong credentials), display it
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {role === 'student' && (
          <>
            <label>Standard:</label>
            <select value={standard} onChange={(e) => setStandard(e.target.value)} required>
              <option value="">Select Standard</option>
              <option value="8">8th</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
            </select>

            <label>Roll No:</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter roll number"
              required
            />
          </>
        )}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* Button to navigate to the Signup page */}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/signup')}>Go to Signup</button>
      </div>

      {/* Link to navigate to the Admin Dashboard with onClick event */}
      <div className="admin-dashboard-link">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            navigate('/admin-login'); // Navigate to the Admin Dashboard
          }}
          className="admin-link"
        >
          Go to Admin Dashboard
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
