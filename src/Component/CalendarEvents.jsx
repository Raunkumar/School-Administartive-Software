import React from 'react';
import './CalendarEvents.css';

const events = [
  { date: '2024-01-01', title: 'New Year\'s Day', type: 'Holiday' },
  { date: '2024-02-14', title: 'Valentine\'s Day', type: 'Holiday' },
  { date: '2024-03-10', title: 'Monthly Test 1', type: 'Test' },
  { date: '2024-04-15', title: 'Science Exam', type: 'Exam' },
  { date: '2024-05-01', title: 'Labor Day', type: 'Holiday' },
  { date: '2024-05-20', title: 'Monthly Test 2', type: 'Test' },
  { date: '2024-06-10', title: 'History Exam', type: 'Exam' },
  { date: '2024-07-04', title: 'Independence Day', type: 'Holiday' },
  { date: '2024-08-01', title: 'Monthly Test 3', type: 'Test' },
  { date: '2024-09-05', title: 'Teachers\' Day', type: 'Holiday' },
  { date: '2024-10-01', title: 'Monthly Test 4', type: 'Test' },
  { date: '2024-11-01', title: 'Diwali Holiday', type: 'Holiday' },
  { date: '2024-12-10', title: 'End of Year Exams', type: 'Exam' },
  { date: '2024-12-25', title: 'Christmas', type: 'Holiday' },
];

const CalendarEvents = () => {
  return (
    <div className="calendar-section">
      <h2>Calendar of Events 2024</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className={event.type === 'Exam' ? 'exam-row' : ''}>
              <td>{event.date}</td>
              <td>{event.title}</td>
              <td>{event.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarEvents;
