import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Content = mongoose.model('Content', contentSchema);
