const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
//const { validateSignUpData } = require("../utils/validation");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid"); 
    }

    const decodedData = jwt.verify(token, "90517412hasi");
    const { _id } = decodedData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message); 
  }
};

module.exports = {
  userAuth,
};
