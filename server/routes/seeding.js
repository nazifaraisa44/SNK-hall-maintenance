import express from 'express';
import { Review } from '../models/seedData.js'; // Assuming Review is exported from seedData.js

const router = express.Router();

router.post('/reviews', async (req, res) => {
  const { workSerialNumber, workStatus } = req.body;

  const newReview = new Review({
    workSerialNumber,
    workStatus,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error saving review', error });
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

//Add the /report route to fetch review data
router.get('/reviews/report', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review report', error });
  }
});

export { router as reviewRouter };
