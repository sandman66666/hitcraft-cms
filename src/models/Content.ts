import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
