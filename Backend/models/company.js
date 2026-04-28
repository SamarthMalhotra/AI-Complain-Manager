import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company Name is Mendatory"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Company Email is Mendatory"],
    trim: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Company Phone Number is Mendatory"],
    trim: true,
    minlength: [10, "Company Phone Number should be 10 digit"],
    maxlength: [10, "Company Phone Number should be 10 digit"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Company Address is Mendatory"],
    trim: true,
  },
  website: {
    type: String,
    required: [true, "Company Website is Mendatory"],
    trim: true,
  },
  complains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complain",
    },
  ],
});
const Company = mongoose.model("Company", companySchema);
export default Company;
