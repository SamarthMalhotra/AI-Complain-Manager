//install dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
//Complain Route
import complainRoute from "./router/complainRoute.js";
//Admin Route
import adminRoute from "./router/adminRoute.js";
import passport from "passport";
//Signup route
import signupRoute from "./router/signupRoute.js";
//Company Route
import companyRoute from "./router/companyRoute.js";
//Dotenv
dotenv.config();
//Server
const server = express();
//Connect backend with frontend
server.use(
  cors({
    origin: "https://ai-complain-manager-frontend.onrender.com",
    //origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
//PORT
const PORT = process.env.PORT;
//Passport Local Strategy
import { Strategy as LocalStrategy } from "passport-local";
//Login function
import loginfun from "./local.js";
//It convert json object in js object
server.use(passport.initialize());
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    loginfun,
  ),
);
server.use(express.json());
//It convert urlencoded data in req body
server.use(express.urlencoded({ extended: true }));
//Complain route
server.use("/api/complain", complainRoute);
//Signup Route
server.use("/api", signupRoute);
//Admin Route
server.use("/api/admin", adminRoute);
//Company Route
server.use("/api/company", companyRoute);
// Server listening and Database connection
const connectDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://Samarth:${process.env.PASSWORD}@cluster0.vmftzzj.mongodb.net/test`,
    )
    .then(() => {
      console.log("Database connected");
    });
};
// Test Route
server.get("/", (req, res) => {
  res.send("Server is running");
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});
