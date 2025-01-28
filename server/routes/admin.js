import express from "express";
import bcrypt from "bcrypt";  // Corrected spelling error

import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.KEY, {
      expiresIn: "128h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ status: true, message: "Admin login successful" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

export { adminRouter };