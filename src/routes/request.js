const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // ✅ Fixed path

// POST /sendConnectionRequest (Protected)
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending connection request...");
  res.send(`${user.firstName} sent the connection request!`);
});

module.exports = requestRouter;
