import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [students, setStudents] = useState([{ name: '', present: false }]);
  const [attendanceList, setAttendanceList] = useState([]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newStudents = [...students];
    newStudents[index][name] = value;
    setStudents(newStudents);
  };

  const handleCheckboxChange = (index) => {
    const newStudents = [...students];
    newStudents[index].present = !newStudents[index].present;
    setStudents(newStudents);
  };

  const addStudent = () => {
    setStudents([...students, { name: '', present: false }]);
  };

  const submitAttendance = (event) => {
    event.preventDefault();
    setAttendanceList(students);
    // Reset the student list if desired
    setStudents([{ name: '', present: false }]);
  };

  return (
    <div className="attendance-section">
      <h2>Attendance</h2>
      <form onSubmit={submitAttendance}>
        {students.map((student, index) => (
          <div key={index} className="student-entry">
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Student Name"
              required
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
        ))}
        <button type="button" onClick={addStudent}>
          Add Student
        </button>
        <button className='submit' type="submit">Submit Attendance</button>
      </form>

      <h3>Attendance List</h3>
      <ul>
        {attendanceList.map((student, index) => (
          <li key={index}>
            {student.name}: {student.present ? 'Present' : 'Absent'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
