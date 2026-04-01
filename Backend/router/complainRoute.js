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
    let result = await sendMail(complain, user);
    await user.save();

    res
      .status(201)
      .json({ message: "Complain registered successfully , " + result });
  } catch (e) {
    res.status(500).json({ message: e.message + result });
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
