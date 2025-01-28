// routes/complaint.js
import express from 'express';
import { Submittedcom } from '../models/submittedcom.js';

const router = express.Router();

router.post('/submittedcoms', async (req, res) => {
  const { studentID, roomNumber, complaint } = req.body;

  const newComplaint = new Submittedcom({
    studentID,
    roomNumber,
    complaint,
  });

  try {
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error saving complaint', error });
  }
});

router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});

export { router as complaintRouter }; // Named export
