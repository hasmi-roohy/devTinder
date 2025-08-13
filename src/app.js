const express = require("express");
const app = express();
const connectDB = require("./config/data");
const cookieParser = require("cookie-parser");

// ✅ MIDDLEWARE (ORDER MATTERS!)
app.use(express.json()); // Must be FIRST for JSON parsing
app.use(cookieParser()); // For cookie handling

// ✅ ROUTERS
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// ✅ ROUTER MOUNTING
app.use("/auth", authRouter); // /auth/signup
app.use("/profile", profileRouter);
app.use("/request", requestRouter);


// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ START SERVER
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(7412, () => {
      console.log("🚀 Server running on http://localhost:7412");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });
