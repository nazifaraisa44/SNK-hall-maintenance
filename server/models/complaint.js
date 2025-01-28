
// models/complaint.js

import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  roomNumber: { type: String, required: true },
  complaint: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'submitted' }, // Add status field with default value
  category: { type: String, required: true },
});

export const Complaint = mongoose.model('Complaint', complaintSchema);
