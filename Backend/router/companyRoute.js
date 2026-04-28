import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import Signup from "../models/signup.js";
import Company from "../models/company.js";
const router = express.Router();
//Access Company
router.get("/access", jwtAuthMiddleware, async (req, res) => {
  const { id } = req.user;
  const user = await Signup.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    const company = await Company.find({}, { _id: 1, name: 1 });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    } else {
      return res.status(200).json({ company });
    }
  }
});
router.post("/id", jwtAuthMiddleware, async (req, res) => {
  const { id } = req.user;
  const user = await Signup.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else if (user.role !== "Admin") {
    return res.status(403).json({ message: "Only Admin can access company" });
  } else {
    const { id } = req.body;
    const company = await Company.findById(id, {
      _id: 1,
      name: 1,
      complains: 1,
    }).populate("complains");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    } else {
      return res.status(200).json({ company });
    }
  }
});
//Register Company
router.post("/register", jwtAuthMiddleware, async (req, res) => {
  const { id } = req.user;
  const user = await Signup.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else if (user.role !== "Admin") {
    return res.status(403).json({ message: "Only Admin can register company" });
  } else {
    const { name, email, phone, address, website } = req.body;
    const company = await Company.create({
      name,
      email,
      phone,
      address,
      website,
    });
    if (!company) {
      return res.status(500).json({ message: "Error in registering company" });
    } else {
      return res
        .status(200)
        .json({ message: "Company is Register Successfully" });
    }
  }
});
export default router;
