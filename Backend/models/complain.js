import mongoose from "mongoose";
const complainSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Complain Issue is Mendatory"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: (v) => v.toISOString().split("T")[0],
    },
    description: {
      type: String,
      required: [true, "Complain Description is Mendatory"],
      trim: true,
    },
    contractNumber: {
      type: Number,
      required: [true, "Contract Number is Mendatory"],
      trim: true,
      minlength: [10, "Contract Number should be 10 digit"],
      maxlength: [10, "Contract Number should be 10 digit"],
    },
    status: {
      type: Number,
      default: 0,
    },
    reply: {
      type: String,
      default: null,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    toJSON: { getters: true },
  },
);
const Complain = mongoose.model("Complain", complainSchema);
export default Complain;
