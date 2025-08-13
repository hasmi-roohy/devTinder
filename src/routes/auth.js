const express = require("express");
const authRouter = express.Router();
const { validateSignUpData ,validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { userAuth } = require("../middleware/auth");
// SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    console.log("Incoming Content-Type:", req.headers["content-type"]);
    console.log("Incoming body:", req.body);

    validateSignUpData(req.body);

    const { firstName, lastName, email, gender, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      }
    });
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ message: err.message || "Error saving user" });
  }
});

// LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      "90517412hasi", // same as in auth middleware
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
     req.user=user;
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.status(200).json({ message: "Logged out successfully" });
});
//patch
authRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
         if(!validateEditProfileData(req)){
          throw new Error("invalid edit request");
         }
         const loggeduser=req.user;
        //  loggeduser.firstName=req.body.firstName;
        //  loggeduser.lastName=req.body.lastName;
        //  loggeduser.gender=req.body.gender;
         Object.keys(req.body).forEach((key)=>{loggeduser[key]=req.body[key]});
         await loggeduser.save();
         console.log(loggeduser);
         res.status(400).send("okkk");
  }
  catch(err){
    console.log(err.message);
  }
});
module.exports = authRouter;
