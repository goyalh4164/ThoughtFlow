import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
import { registerUser ,loginUser , getUserProfile , updateUserProfile , deleteUserAccount, logoutUserAccount} from '../controllers/User.js';
const router = express.Router();

// Route: Register a new user
router.post('/register', registerUser);

// Route: User login
router.post('/login',loginUser);

// Route: Get user profile
router.get('/profile', authenticateUser, getUserProfile);

// Route: Update user profile
router.put('/:userId', authenticateUser,updateUserProfile);


// Route: Delete user account
router.delete('/:userId', authenticateUser, deleteUserAccount);

// Route: User logout
router.post('/logout', logoutUserAccount);

export default router;
