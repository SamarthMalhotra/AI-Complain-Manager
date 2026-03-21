import { compare } from "bcrypt";
import mongoose from "mongoose";
const bcrypt = await import("bcrypt");

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Mendatory"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Mendatory"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Mendatory"],
    trim: true,
    minlength: [6, "Password should be atleast 6 character"],
  },
  complain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complain",
      default: null,
    },
  ],
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

signupSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  } else {
    const salt = await bcrypt.genSalt(10);
    //Hash Password
    this.password = await bcrypt.hash(this.password, salt);
  }
});
signupSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Signup = mongoose.model("Signup", signupSchema);
export default Signup;
