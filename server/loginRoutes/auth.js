const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js'); // Define your User model

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    // Destructure data from request body
    const { name, email, password, address, contactNumber } = req.body;

    // Basic validation (replace with more robust validation as needed)
    if (!name || !email || !password || !address || !contactNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user with the same email exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password, // Note: Password will be hashed before saving
      address,
      contactNumber,
    });

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
// Login route
router.post('/login', async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    console.log(password);
    // Check if user exists
    let user = await User.findOne({ email });
    console.log(user.email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return success response
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
