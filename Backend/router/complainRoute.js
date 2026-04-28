import express from "express";
import Complain from "../models/complain.js";
//import nodemailer from "nodemailer";
import sendMail from "./sendMail.js";
import Company from "../models/company.js";
import signup from "../models/signup.js";
import { jwtAuthMiddleware } from "../jwt.js";
const router = express.Router();
//const LocalAuthMiddleware = passport.authenticate("local", { session: false });
//Register Complain
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    let email = req.user.email;
    let companyId = req.body.company;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: " We can't register your comaplain.Company not Exist.",
      });
    } else {
      const complain = {
        title: req.body.title,
        description: req.body.description,
        contractNumber: req.body.contractNumber,
        status: 2,
        company: req.body.complain,
      };
      const user = await signup.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      } else {
        const complain1 = new Complain(complain);
        const com = await complain1.save();
        user.complain.unshift(com._id);

        //await sendMail(complain, user);

        await user.save();
        res
          .status(201)
          .json({ message: "Complain registered successfully , " });
      }
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
//Status Check
router.get("/status", jwtAuthMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await signup.findOne({ email }).populate("complain");
    if (!user || !user.complain) {
      return res.status(404).json({ message: "Complain doest not exist." });
    } else {
      res.status(200).json(user.complain);
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.delete("/delete", jwtAuthMiddleware, async (req, res) => {
  try {
    const complainId = req.body.id;
    let deleteComplain = await Complain.findByIdAndDelete(complainId);
    if (!deleteComplain) {
      return res.status(404).json({ message: "Complain not found." });
    } else {
      res.status(200).json({ message: "Complain deleted successfully." });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;
