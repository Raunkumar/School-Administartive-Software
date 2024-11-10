import React from 'react';
import './Timetable.css';

const Timetable = () => {
  const timetableData = {
    Monday: [
      { time: '10:00 AM - 11:00 AM', subject: 'Math' },
      { time: '11:00 AM - 12:00 PM', subject: 'Science' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'English' },
      { time: '1:30 PM - 2:30 PM', subject: 'Kannada' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Geography' },
    ],
    Tuesday: [
      { time: '10:00 AM - 11:00 AM', subject: 'Kannada' },
      { time: '11:00 AM - 12:00 PM', subject: 'Math' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'Physical Education' },
      { time: '1:30 PM - 2:30 PM', subject: 'English' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Art' },
    ],
    Wednesday: [
      { time: '10:00 AM - 11:00 AM', subject: 'English' },
      { time: '11:00 AM - 12:00 PM', subject: 'Kannada' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'Science' },
      { time: '1:30 PM - 2:30 PM', subject: 'History' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Geography' },
    ],
    Thursday: [
      { time: '10:00 AM - 11:00 AM', subject: 'Math' },
      { time: '11:00 AM - 12:00 PM', subject: 'Kannada' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'English' },
      { time: '1:30 PM - 2:30 PM', subject: 'Art' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Physical Education' },
    ],
    Friday: [
      { time: '10:00 AM - 11:00 AM', subject: 'History' },
      { time: '11:00 AM - 12:00 PM', subject: 'English' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'Math' },
      { time: '1:30 PM - 2:30 PM', subject: 'Kannada' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Geography' },
    ],
    Saturday: [
      { time: '10:00 AM - 11:00 AM', subject: 'Art' },
      { time: '11:00 AM - 12:00 PM', subject: 'Math' },
      { time: '12:00 PM - 12:30 PM', subject: 'Break' },
      { time: '12:30 PM - 1:30 PM', subject: 'Science' },
      { time: '1:30 PM - 2:30 PM', subject: 'Physical Education' },
      { time: '2:30 PM - 3:00 PM', subject: 'Break' },
      { time: '3:00 PM - 4:00 PM', subject: 'Kannada' },
    ],
  };

  return (
    <div className="timetable-section">
      <h2>Timetable</h2>
      {Object.keys(timetableData).map((day) => (
        <div key={day} className="day-timetable">
          <h3>{day}</h3>
          {timetableData[day].map((classInfo, index) => (
            <div key={index} className={`class-entry ${classInfo.subject === 'Break' ? 'break' : ''}`}>
              <span className="class-time">{classInfo.time}</span>
              <span className="class-subject">{classInfo.subject}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timetable;
