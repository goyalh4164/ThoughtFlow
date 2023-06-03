import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authenticateUser.js';
import Blog from '../models/Blog.js';

// Route: Create a new blog post
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const blog = new Blog({ title, content, author, tags });
    await blog.save();
    res.status(201).json({ message: 'Blog post created successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: Get all blog posts
router.get('/', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route: Get a specific blog post
router.get('/:blogId', authenticateUser, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error('Blog post not found.');
    }
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route: Update a specific blog post
router.put('/:blogId', authenticateUser, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updates = req.body;
    const blog = await Blog.findByIdAndUpdate(blogId, updates, { new: true });
    if (!blog) {
      throw new Error('Blog post not found.');
    }
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route: Delete a specific blog post
router.delete('/:blogId', authenticateUser, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      throw new Error('Blog post not found.');
    }
    res.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
