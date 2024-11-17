import React from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar
import './HomePage.css'; // Your existing HomePage styles

const HomePage = () => {
  return (
    <div className="home-page">
      <AdminNavbar /> {/* Include the Admin Navbar */}
      <div className="home">
      <header className="home-header">
        <h1>Welcome to AAA HighSchool</h1>
        <p>Empowering students through knowledge and creativity.</p>
      </header>

      <section className="announcements">
        <h2>Announcements</h2>
        <ul>
          <li>School reopens on January 5th, 2024.</li>
          <li>Parent-Teacher Meeting on January 10th, 2024.</li>
          <li>Monthly tests start on January 15th, 2024.</li>
        </ul>
      </section>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Science Fair - February 20th, 2024</li>
          <li>Annual Sports Day - March 15th, 2024</li>
          <li>Art Exhibition - April 5th, 2024</li>
        </ul>
      </section>

      <section className="about-school">
        <h2>About Us</h2>
        <p>
          AAA School is dedicated to providing quality education to students 
          from diverse backgrounds. Our mission is to foster a love for learning 
          and to encourage personal growth in every student.
        </p>
      </section>

      <section className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-images">
        <img src="https://media.istockphoto.com/id/1204588501/vector/collection-of-boy-and-girls-scientist-after-failed-experiments-schoolchildren-experimenting.jpg?s=612x612&w=is&k=20&c=atGHRgpJtcRSAxHnjYNEKtsy1hNG5rZ2EG12yJon6Y8=" alt="Science Fair" />
    <img src="https://thumbs.dreamstime.com/z/lesson-activities-school-children-classroom-vector-illustration-74944305.jpg" alt="Classroom Activity" />
    <img src="https://thumbs.dreamstime.com/b/kids-playing-vector-characters-set-young-boys-girls-doing-educational-school-activities-like-toys-painting-reading-book-143982443.jpg" alt="Sports Day" />
        </div>
      </section>

      <footer className="home-footer">
        <h2>Contact Us</h2>
        <p>Email: contact@aaaschool.edu</p>
        <p>Phone: +123 456 7890</p>
      </footer>
    </div>
    </div>
  );
};

export default HomePage;
