import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Announcement = mongoose.model('Announcement', announcementSchema);
