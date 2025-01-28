import express from 'express';
import { Announcement } from '../models/announcement.js';

const router = express.Router();

// POST announcement
router.post('/announcements', async (req, res) => {
  const { title, text } = req.body;

  const newAnnouncement = new Announcement({
    title,
    text
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Error saving announcement', error });
  }
});

// GET announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error });
  }
});

export { router as announcementRouter };
