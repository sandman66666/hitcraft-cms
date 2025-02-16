import type { Schema, Model } from 'mongoose';
const mongoose = require('mongoose') as typeof import('mongoose');

const backupSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Backup = mongoose.model('Backup', backupSchema);
module.exports = { Backup };
