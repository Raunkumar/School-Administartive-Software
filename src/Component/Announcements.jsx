import React, { useState, useEffect } from 'react';
import './Announcements.css';

const announcementsList = [
  "School will be closed on Friday for a public holiday.",
  "Parent-teacher meetings will be held on Saturday.",
  "New sports equipment has been added to the gym.",
  "Don't forget to submit your science project by next week.",
  "School picnic is scheduled for next month!",
  "Extra classes for math will be held on Wednesdays.",
  "The annual day function is coming up; prepare your acts!",
  "New library books have arrived, come and check them out!",
  "Reminder: Annual exams start next week.",
  "New student orientation will be held next month.",
  "Art competition entries are due by next Friday.",
  "Science fair registration is open until next week.",
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const changeAnnouncements = () => {
      const numOfAnnouncements = Math.floor(Math.random() * 9) + 2; // Randomly choose between 2 and 10
      const randomAnnouncements = [];

      // Select unique random announcements
      while (randomAnnouncements.length < numOfAnnouncements) {
        const randomIndex = Math.floor(Math.random() * announcementsList.length);
        const randomAnnouncement = announcementsList[randomIndex];
        if (!randomAnnouncements.includes(randomAnnouncement)) {
          randomAnnouncements.push(randomAnnouncement);
        }
      }

      setAnnouncements(randomAnnouncements);
    };

    changeAnnouncements(); // Initial announcement
    const interval = setInterval(changeAnnouncements, 10000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="announcements-section">
      <h2>Announcements</h2>
      <div className="announcements-container">
        {announcements.map((announcement, index) => (
          <div className="announcement-box" key={index}>
            <p>{announcement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
