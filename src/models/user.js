const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
 
  about: {
     type:String,
     default:"this is default about user",
  },
  skills:{
    type:[String],

  },
   },
  {
    timestamps: true,
  }
  
);

// JWT generation method
userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id },
    "90517412hasi", // Ideally use process.env.JWT_SECRET
    { expiresIn: "7d" } // Fixed typo
  );
  return token;
};

// Password validation method
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
};

// ✅ Prevent OverwriteModelError by checking if model already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
