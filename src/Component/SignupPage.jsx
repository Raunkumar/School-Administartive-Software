import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [standard, setStandard] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [availableRollNos, setAvailableRollNos] = useState([]); // To store roll numbers for the selected standard
  const [isTeacherPending, setIsTeacherPending] = useState(false); // State to check if the teacher's signup is pending
  const navigate = useNavigate();

  // Fetch roll numbers for the selected standard
  useEffect(() => {
    if (standard) {
      fetch(`http://localhost:5000/standard-rollnos/${standard}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.rollNos) {
            setAvailableRollNos(data.rollNos);
          }
        })
        .catch((error) => console.error('Error fetching roll numbers:', error));
    }
  }, [standard]);

  // Handle form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if the entered roll number is valid
    if (role === 'student' && !availableRollNos.includes(rollNo)) {
      alert('Invalid roll number for this standard!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, standard, rollNo }),
      });

      const data = await response.json();

      if (response.ok) {
        // If signup is successful, show success message
        alert('Signup successful!');
        
        if (role === 'teacher') {
          setIsTeacherPending(true); // Set teacher status as pending
          alert('You are a teacher. Your account is pending approval by the admin.');
        } else {
          navigate('/'); // Redirect to login page for students
        }
      } else {
        // If there's an error (e.g., roll number already taken or other issues), show the error message
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
            {availableRollNos.length > 0 && (
              <div className="available-rollnos">
                <p>Available Roll Numbers for Standard {standard}:</p>
                <ul>
                  {availableRollNos.map((roll, index) => (
                    <li key={index}>{roll}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {role === 'teacher' && (
          <div className="teacher-message">
            <p>You are signing up as a teacher. Your account will be reviewed by the admin before activation.</p>
          </div>
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

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>

      {isTeacherPending && (
        <div className="pending-message">
          <p>Your account is currently pending approval by the admin. Please wait for confirmation.</p>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
