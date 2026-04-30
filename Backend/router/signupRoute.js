import signup from "../models/signup.js";
import express from "express";
import { generateToken } from "../jwt.js";
import emailValidator from "node-email-verifier";

// // Basic validation (format + MX checking)
// async function validateEmail(email) {
//   try {
//     const isValid = await emailValidator(email);
//   } catch (error) {
//     console.error("Validation error:", error);
//   }
// }
// Signupcd
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isValid = await emailValidator(email);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Email." });
    }
    const user = await signup.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({ message: "Signup Successful", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});
// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isValid = await emailValidator(email);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Email." });
    }
    const user = await signup.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: "You are not existing user go for SignUp." });
    } else if (await user.comparePassword(password)) {
      const token = generateToken(user);
      res
        .status(201)
        .json({ message: "Welcome", token: token, role: user.role });
    } else {
      res.status(401).json({ message: "Incorrect Password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});
export default router;
