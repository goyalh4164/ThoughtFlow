import mongoose from 'mongoose';
import { commentSchema } from './Comment.js';

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
