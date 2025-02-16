import mongoose from 'mongoose';

const backupSchema = new mongoose.Schema({
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

const Backup = mongoose.model('Backup', backupSchema);

export default Backup;
