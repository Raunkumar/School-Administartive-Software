import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './AdminLoginPage.css';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Predefined admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'admin123'; // Change to your desired password

    if (username === adminUsername && password === adminPassword) {
      // If credentials match, navigate to Admin Dashboard
      navigate('/admin-dashboard');
    } else {
      // Show an error if credentials do not match
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AdminLoginPage;
