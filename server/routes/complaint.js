import express from 'express';
import { Complaint } from '../models/complaint.js';

const router = express.Router();

router.post('/complaints', async (req, res) => {
  const { studentID, roomNumber, complaint, category } = req.body;
  

  const newComplaint = new Complaint({
    studentID,
    roomNumber,
    complaint,
    status: 'submitted', // Ensure status is initialized
    category // Add category field
  });

  try {
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error saving complaint', error });
  }
});

router.get('/complaints', async (req, res) => {
  const { status ,category, studentID} = req.query;

  try {
    const query = {};
    if (status) query.status = status;
    if (studentID) query.studentID = studentID;
    if (category) query.category = category;

    const complaints = await Complaint.find(query);
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});


// Updated GET complaints route to fetch by studentID
router.get('/complaints', async (req, res) => {
  const { status, studentID } = req.query;

  try {
    const query = {};
    if (status) query.status = status;
    if (studentID) query.studentID = studentID;

    const complaints = await Complaint.find(query);
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});


// Endpoint to update the status of a complaint
router.patch('/complaints/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint status', error });
  }
});

export { router as complaintRouter }; // Named export
