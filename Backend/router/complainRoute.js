import express from "express";
import Complain from "../models/complain.js";
import nodemailer from "nodemailer";
import signup from "../models/signup.js";
import { jwtAuthMiddleware } from "../jwt.js";
const router = express.Router();
//const LocalAuthMiddleware = passport.authenticate("local", { session: false });
//Register Complain
router.post("/", jwtAuthMiddleware, async (req, res) => {
  let email = req.user.email;
  const complain = {
    title: req.body.title,
    description: req.body.description,
    contractNumber: req.body.contractNumber,
    status: 2,
  };
  const user = await signup.findOne({ email });
  const complain1 = new Complain(complain);
  const com = await complain1.save();
  user.complain.unshift(com._id);
  await user.save();
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
    text: complain.description + ` Register Successful`, // Plain-text version of the message
  });
  //Mail is going to mail operator
  const operator = await transporter.sendMail({
    from: "samarthmalhotra5200@gmail.com",
    to: "operator1234@gmail.com",
    subject: complain.title,
    text: complain.description + `Complain Received`, // Plain-text version of the message
  });
  res.status(201).json({ message: "Complain registered successfully" });
});
//Status Check
router.get("/status", jwtAuthMiddleware, async (req, res) => {
  const email = req.user.email;
  const user = await signup.findOne({ email }).populate("complain");
  if (!user || !user.complain) {
    return res.status(404).json({ message: "Complain doest not exist." });
  } else {
    res.status(200).json(user.complain);
  }
});

export default router;
