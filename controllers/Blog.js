import Blog from "../models/Blog.js";

export const createBlogPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { userId, author } = req.body; // Destructure userId and author from the request body
    const blog = new Blog({
      title,
      content,
      userId,
      author,
      tags,
      likes: 0,
      comments: [],
    });
    await blog.save();
    res.status(201).json({ message: "Blog post created successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog post not found.");
    }
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updates = req.body;
    const blog = await Blog.findByIdAndUpdate(blogId, updates, { new: true });
    if (!blog) {
      throw new Error("Blog post not found.");
    }
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      throw new Error("Blog post not found.");
    }
    res.json({ message: "Blog post deleted successfully." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addCommentToBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { comment } = req.body;
    const author = req.body.author; // Extract the author from the authenticated user
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog post not found.");
    }
    blog.comments.push({ comment, author });
    await blog.save();
    res.json({ message: "Comment added successfully." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addLikeToBlogPost = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog post not found.");
    }
    blog.likes++;
    await blog.save();
    res.json({ message: "Like added successfully." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
