import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/authenticateUser.js';
import Blog from '../models/Blog.js';
import { createBlogPost,getAllBlogPosts,getBlogPost,updateBlogPost,deleteBlogPost,addCommentToBlogPost,addLikeToBlogPost } from '../controllers/Blog.js';

// Route: Create a new blog post
router.post('/', authenticateUser, createBlogPost);

// Route: Get all blog posts
router.get('/', authenticateUser, getAllBlogPosts);

// Route: Get a specific blog post
router.get('/:blogId', authenticateUser, getBlogPost);

// Route: Update a specific blog post
router.put('/:blogId', authenticateUser, updateBlogPost);

// Route: Delete a specific blog post
router.delete('/:blogId', authenticateUser, deleteBlogPost);

// Route: Add a comment to a blog post
router.post('/:blogId/comments', authenticateUser, addCommentToBlogPost);


// Route: Add a like to a blog post
router.post('/:blogId/likes', authenticateUser, addLikeToBlogPost);

export default router;
