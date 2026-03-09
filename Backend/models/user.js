import Complain from "./complain.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Customer name is Mendatory"],
    set: (v) => v.trim(),
  },
  email: {
    type: String,
    requited: [true, "Email is mendatory"],
    unique: [[true, "Email already exists"]],
    match: [/@/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be 8 character long"],
    required: [true, "Password is Necessary"],
  },
  complain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complain",
    default: null,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
