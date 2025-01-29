import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  workSerialNumber: {
    type: Number,
    required: true
  },
  workStatus: {
    type: String,
    enum: ['satisfied', 'neutral', 'dissatisfied'],
    required: true
  }
});

export const Review = mongoose.model('Review', reviewSchema);