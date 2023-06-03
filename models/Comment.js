import mongoose from 'mongoose';

export const commentSchema = mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});