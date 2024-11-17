import React, { useState, useEffect } from 'react';
import './TeacherAttendance.css';

const TeacherAttendance = () => {
  const [standard, setStandard] = useState(''); // Standard selected (8th, 9th, 10th)
  const [availableRollNos, setAvailableRollNos] = useState([]); // To store roll numbers
  const [students, setStudents] = useState([]); // Student list with roll numbers and attendance
  const [attendanceList, setAttendanceList] = useState([]); // Final attendance list for submission

  // Fetch roll numbers for the selected standard
  useEffect(() => {
    if (standard) {
      fetch(`http://localhost:5000/standard-rollnos/${standard}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.rollNos) {
            setAvailableRollNos(data.rollNos);
            // Initialize the students list based on the fetched roll numbers
            const initialStudents = data.rollNos.map((rollNo) => ({
              rollNo,
              present: false,
            }));
            setStudents(initialStudents);
          }
        })
        .catch((error) => {
          console.error('Error fetching roll numbers:', error);
          alert('Error fetching roll numbers. Please try again.');
        });
    }
  }, [standard]); // Run this effect whenever the standard changes

  // Handle standard change (when the teacher selects a class)
  const handleStandardChange = (e) => {
    setStandard(e.target.value);
  };

  // Handle checkbox change for attendance marking
  const handleCheckboxChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);
  };

  // Submit attendance form
  const submitAttendance = (event) => {
    event.preventDefault();
    setAttendanceList(students); // Store the attendance list
    // Reset the student list if desired
    alert('Attendance submitted!');
    // Optionally, reset the students list after submission
    // setStudents([]);
  };

  return (
    <div className="attendance-section">
      <h2>Mark Attendance</h2>

      {/* Dropdown to select the class/standard */}
      <label>Select Standard:</label>
      <select value={standard} onChange={handleStandardChange} required>
        <option value="">Select Standard</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
      </select>

      {standard && (
        <>
          {/* Form for marking attendance */}
          <form onSubmit={submitAttendance}>
            {students.length > 0 ? (
              students.map((student, index) => (
                <div key={index} className="student-entry">
                  <input
                    type="text"
                    value={student.rollNo}
                    readOnly
                    className="readonly-input"
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    Present
                  </label>
                </div>
              ))
            ) : (
              <p>No students available for the selected standard.</p>
            )}
            <button className="submit" type="submit">Submit Attendance</button>
          </form>

          {/* Display attendance list after submission */}
          <h3>Attendance List</h3>
          <ul>
            {attendanceList.map((student, index) => (
              <li key={index}>
                {student.rollNo}: {student.present ? 'Present' : 'Absent'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeacherAttendance;
