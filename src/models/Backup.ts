import mongoose from 'mongoose';

const backupSchema = new mongoose.Schema({
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

export const Backup = mongoose.model('Backup', backupSchema);
