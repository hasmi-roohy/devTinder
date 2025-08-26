const express = require("express");
const app = express();
const connectDB = require("./config/data");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ✅ Middleware (order matters!)
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
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

module.exports = app;
