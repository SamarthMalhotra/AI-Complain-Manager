import express from "express";
import Complain from "Backend/models/complain.js";
const router = express.Router();

router.get("/admin", async (req, res) => {
  const complains = await Complain.find().sort({ createdAt: -1 });
  res.status(200).json(complains);
});
export default router;
