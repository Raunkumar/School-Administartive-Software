const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser.json() to parse JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/login-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define a Standard model to store available roll numbers for each standard
const Standard = mongoose.model('Standard', {
  standard: { type: String, required: true, unique: true },
  rollNos: [{ type: String, required: true }] // Array of roll numbers
});

// Define a User model with role, standard, and rollNo
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // Student or Teacher
  standard: { 
    type: String, 
    required: function() { return this.role === 'student'; }, // Only required for students
  },
  rollNo: { 
    type: String, 
    required: function() { return this.role === 'student'; }, // Only required for students
  },
  status: { type: String, default: 'pending' }, // Teacher status (pending or active)
});

// Mongoose pre-save middleware to conditionally validate standard and rollNo for students
userSchema.pre('save', function(next) {
  if (this.role === 'student') {
    if (!this.standard || !this.rollNo) {
      return next(new Error('Standard and RollNo are required for students.'));
    }
  }
  next(); // Continue with saving if validation passes
});

const User = mongoose.model('User', userSchema);

// Setup Nodemailer transport (for sending email)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: 'arunkumar.rm8123@gmail.com', // Admin email
    pass: 'wava ruvn ffal eqwh', // App password for Gmail (NOT regular password)
  },
});

// Endpoint to handle login
app.post('/login', async (req, res) => {
  console.log('Login request received');
  const { email, password, role, standard, rollNo } = req.body;

  // Only require 'standard' and 'rollNo' if role is 'student'
  if (!email || !password || !role || (role === 'student' && (!standard || !rollNo))) {
    return res.status(400).json({ error: 'Email, password, role, and for student: standard and rollNo are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Check role, standard, and rollNo only for students
      if (user.role === role) {
        if (role === 'student' && user.standard === standard && user.rollNo === rollNo) {
          if (user.status === 'active') {
            return res.json({ message: 'Login successful', user });
          } else {
            return res.status(401).json({ error: 'Your account is pending approval. Please wait for admin approval.' });
          }
        } else if (role === 'teacher') {
          if (user.status === 'active') {
            return res.json({ message: 'Login successful', user });
          } else {
            return res.status(401).json({ error: 'Your account is pending approval. Please wait for admin approval.' });
          }
        }
      }
      return res.status(401).json({ error: 'Wrong credentials (role, standard, or roll number)' });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to handle user creation (Signup)
app.post('/signup', async (req, res) => {
  console.log('Signup request received');
  const { email, password, role, standard, rollNo } = req.body;

  // Validate input fields
  if (!email || !password || !role || (role === 'student' && (!standard || !rollNo))) {
    return res.status(400).json({ error: 'Email, password, role, and for student: standard and rollNo are required' });
  }

  // For students, validate the standard and rollNo
  if (role === 'student') {
    try {
      const standardRecord = await Standard.findOne({ standard });

      if (!standardRecord || !standardRecord.rollNos.includes(rollNo)) {
        return res.status(400).json({ error: 'Invalid roll number for this standard' });
      }

      // Check if roll number is already used for this standard
      const existingUser = await User.findOne({ rollNo, standard });
      if (existingUser) {
        return res.status(400).json({ error: 'Roll number already used for this standard' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Server error while checking roll number' });
    }
  }

  // Check if the email already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      standard: role === 'student' ? standard : undefined,
      rollNo: role === 'student' ? rollNo : undefined,
      status: role === 'teacher' ? 'pending' : 'active', // Teachers are 'pending' initially
    });

    await newUser.save();

    // If the role is 'teacher', send an email to the admin
    if (role === 'teacher') {
      const mailOptions = {
        from: 'arunkumar.rm8123@gmail.com',  // Admin's email
        to: 'arunkumar.rm8123@gmail.com',    // Admin's email
        subject: 'New Teacher Signup - Pending Approval',
        text: `A new teacher has signed up with email: ${email}. Please review the request and approve or deny access.`
      };

      // Send email using Nodemailer
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send email to admin' });
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.log('Error in signup:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes

// Endpoint to get all teachers with 'pending' status
app.get('/teachers/pending', async (req, res) => {
  try {
    const pendingTeachers = await User.find({ role: 'teacher', status: 'pending' });

    if (!pendingTeachers || pendingTeachers.length === 0) {
      return res.status(404).json({ error: 'No teachers are pending approval.' });
    }

    res.json({ teachers: pendingTeachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching pending teachers' });
  }
});

// Endpoint to approve or deny teacher (set status to 'active' or 'denied')
app.patch('/approve-teacher/:email', async (req, res) => {
  const { email } = req.params;
  const { action } = req.body;  // 'approve' or 'deny'

  if (!action || (action !== 'approve' && action !== 'deny')) {
    return res.status(400).json({ error: 'Invalid action. Must be "approve" or "deny".' });
  }

  try {
    const user = await User.findOne({ email, role: 'teacher' });

    if (!user) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }

    // If the action is to approve, set the status to 'active'
    if (action === 'approve') {
      user.status = 'active';
    } else if (action === 'deny') {
      user.status = 'denied';  // You can set this to 'pending' or just delete if needed
    }

    await user.save();  // Save the updated user

    res.json({ message: `Teacher's account ${action === 'approve' ? 'approved' : 'denied'}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error approving/denying teacher' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
