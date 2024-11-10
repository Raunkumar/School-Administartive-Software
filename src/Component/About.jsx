import React from 'react';
import './About.css'; // Import CSS for styling if needed

const About = () => {
  return (
    <div className="about-section">
      <h2>About Us</h2>
      <p>
        Welcome to AAA School, a place where academic excellence meets a nurturing environment. 
        Established in 2005, we have dedicated ourselves to providing a comprehensive education 
        that empowers students to reach their full potential.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to foster a supportive and engaging learning atmosphere that promotes 
        intellectual curiosity and social responsibility. We strive to cultivate lifelong learners 
        who are prepared to meet the challenges of an ever-changing world.
      </p>
      <h3>Our Values</h3>
      <ul>
        <li><strong>Excellence:</strong> We are committed to achieving the highest standards in education.</li>
        <li><strong>Integrity:</strong> We uphold honesty and fairness in all our interactions.</li>
        <li><strong>Respect:</strong> We foster a culture of respect for ourselves, others, and the community.</li>
        <li><strong>Innovation:</strong> We embrace creativity and new ideas to enhance learning.</li>
      </ul>
      <h3>Why Choose Us?</h3>
      <p>
        At AAA School, we offer a diverse curriculum that caters to the needs of all students. 
        Our dedicated staff is passionate about education and works collaboratively to ensure 
        each student receives personalized attention. With a wide range of extracurricular activities, 
        we encourage students to explore their interests and develop new skills outside the classroom.
      </p>
      <h3>Get Involved</h3>
      <p>
        We believe that the best education occurs when parents, teachers, and students work together. 
        We invite you to join our community and participate in various events, volunteer opportunities, 
        and school activities that enrich our students' experiences.
      </p>
    </div>
  );
};

export default About;
