import express from "express";
import bcrypt from "bcrypt";  // Corrected spelling error
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Admin } from "../models/admin.js";

// Middleware to verify user (defined before routes)
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    req.userId = decoded.userId;  // Pass userId to the request object
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "unauthorized" });
  }
};

router.post("/Signup", async (req, res) => {
  const { email, name, password, phone, id, room, present, parent } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already existed" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashpassword,
      phone,
      id,
      room,
      present,
      parent,
    });

    await newUser.save();
    return res.status(201).json({ status: true, message: "record registered" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "internal server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) || await Admin.findOne({ email }); // Check both collections
    if (!user) {
      return res.status(401).json({ message: "user is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "password is incorrect" });
    }
    const role = user instanceof Admin ? "admin" : "user"; 
    console.log(`Role determined: ${role}`); // Log the role
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "128h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ status: true, message: "Login successful", role });
  } catch (err) {
    return res.status(500).json({ message: "internal server error", error: err.message });
  }
});

router.get("/signup", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const { email, id, room, name, present, parent, phone } = user; // Extract name and email for response
   
    res.json({ email, id, room, name, present, parent, phone });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Verify route (protected by verifyUser middleware)
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true });
});



router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

router.delete('/delete-user/:id', async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
  }
});
export { router as UserRouter };