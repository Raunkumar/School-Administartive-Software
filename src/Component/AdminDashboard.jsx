import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  // Fetch all teachers with 'pending' status from the server
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/teachers/pending');
        const data = await response.json();

        if (response.ok) {
          setTeachers(data.teachers);
        } else {
          setError(data.error || 'Failed to fetch teachers');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchTeachers();
  }, []);

  const handleApproval = async (email, action) => {
    try {
      const response = await fetch(`http://localhost:5000/approve-teacher/${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Refresh the teacher list
        setTeachers(teachers.filter((teacher) => teacher.email !== email));
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      alert('Error processing the request');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Teacher Approval Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.email}>
              <td>{teacher.email}</td>
              <td>{teacher.status}</td>
              <td>
                <button onClick={() => handleApproval(teacher.email, 'approve')}>
                  Approve
                </button>
                <button onClick={() => handleApproval(teacher.email, 'deny')}>
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
