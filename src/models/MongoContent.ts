import mongoose from 'mongoose';

const mongoContentSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const MongoContent = mongoose.model('Content', mongoContentSchema);