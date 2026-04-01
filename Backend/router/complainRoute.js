import express from "express";
import Complain from "../models/complain.js";
import sendMail from "./sendMail.js";
import signup from "../models/signup.js";
import { jwtAuthMiddleware } from "../jwt.js";
const router = express.Router();
//const LocalAuthMiddleware = passport.authenticate("local", { session: false });
//Register Complain
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
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
    console.log("------------------");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 587,
      auth: {
        user: "samarthmalhotra5200@gmail.com",
        pass: process.env.Email_PASSWORD,
      },
    });
    //Mail is going to Client
    const info = await transporter.sendMail({
      from: "samarthmalhotra5200@gmail.com",
      to: user.email,
      subject: complain.title,
      text: `Dear ${user.username || "Customer"},

Thank you for reaching out to us. Your complaint has been successfully registered.

Here are your complaint details:

-----------------------------------
Complaint Title: ${complain.title}
Description: ${complain.description}
Date: ${new Date().toLocaleString()}
-----------------------------------

Our team will review your complaint and get back to you as soon as possible.

We appreciate your patience.

Regards,
Support Team
`, // Plain-text version of the message
    });
    //Mail is going to mail operator
    const operator = await transporter.sendMail({
      from: "samarthmalhotra5200@gmail.com",
      to: "samarthmalhotra5200@gmail.com",
      subject: complain.title,
      text: `Dear Operator,

A new complaint has been received through the system. Please find the details below:

-----------------------------------
Complaint Title: ${complain.title}
Description: ${complain.description}
Submitted By: ${user.username || "Anonymous"}
Customer Email: ${user.email}
Date: ${new Date().toLocaleString()}
-----------------------------------

Kindly review and take the necessary action.

Thank you,
Complaint Management System`, // Plain-text version of the message
    });
    /* try {
      await sendMail(complain, user);
    } catch (err) {
      console.log("MAIL ERROR:", err.message);
    }
    console.log("------------------");*/
    await user.save();
    res.status(201).json({ message: "Complain registered successfully" });
  } catch (e) {
    res.status(500).json({ message: e });
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

export default router;
