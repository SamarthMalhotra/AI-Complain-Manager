import express from "express";
import nodemailer from "nodemailer";
import Complain from "../models/complain.js";
import signup from "../models/signup.js";
import { jwtAuthMiddleware } from "../jwt.js";

const router = express.Router();

router.get("/complain", jwtAuthMiddleware, async (req, res) => {
  const { email } = req.user;
  try {
    let admin = await signup.findOne({ email });
    //  console.log(admin.role);
    if (admin.role != "Admin") {
      res.json(403).json({
        message:
          "Access denied. You do not have permission to view this complaint.",
      });
    } else {
      const complains = await Complain.find().sort({ createdAt: -1 });
      res.status(200).json(complains);
    }
  } catch (error) {
    res.json(500).json({ message: error });
  }
});
//Reply of Complain
router.post("/reply", jwtAuthMiddleware, async (req, res) => {
  const { email } = req.user;
  const { reply, id } = req.body;
  try {
    let admin = await signup.findOneAndUpdate({ email });
    if (admin.role != "Admin") {
      res.json(403).json({
        message:
          "Access denied. You do not have permission to view this complaint.",
      });
    } else {
      let complain = await Complain.findByIdAndUpdate(id);
      complain.reply = reply;
      complain.status = 3;
      await complain.save();
      await admin.save();
      //Send Email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "samarthmalhotra5200@gmail.com",
          pass: process.env.Email_PASSWORD,
        },
      });
      //Mail is going to Client
      const info = await transporter.sendMail({
        from: "samarthmalhotra5200@gmail.com",
        to: email,
        subject: complain.title,
        text: `Dear Customer \n Please Check your Daskboard on complain manager.\n\n\n\n
          ${reply}`,
      });
      res.status(201).json({ message: "Reply has sended successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
export default router;
