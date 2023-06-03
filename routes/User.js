import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/authenticateUser.js';

const router = express.Router();

// Route: Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error('Invalid email or password.');
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    
    // Set the token as a cookie in the response
    res.cookie('token', token, {
      httpOnly: true,
      // Other cookie options if needed
    });
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Route: Get user profile
router.get('/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route: Update user profile
router.put('/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      throw new Error('User not found.');
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route: Delete user account
router.delete('/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
