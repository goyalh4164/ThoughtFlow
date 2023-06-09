import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token; // Access the token from the cookie

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }
    
    // Set userId and author in the request body
    req.body.userId = user._id;
    req.body.author = user.username;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token.' });
  }
};
