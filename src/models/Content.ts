import type { Schema, Model } from 'mongoose';
const mongoose = require('mongoose') as typeof import('mongoose');

const contentSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

const Content = mongoose.model('Content', contentSchema);
module.exports = { Content };
