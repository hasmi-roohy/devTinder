code of app.js


const express = require("express");
const connectDB = require("./config/data");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(cookieParser());

// POST /signUp
app.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, gender, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender
    });

    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ message: err.message || "Error saving user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email ID");
    }
          //const isPasswordValid=
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }
       //const token=await user.getJWT();
    const token = await jwt.sign({ _id: user._id }, "90517412hasi");
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });

    res.status(200).send("Login successful");
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try{
  // const cookies = req.cookies;
  // const { token } = cookies;
  //  if (!token) {
  //    return res.status(401).send("No token found");
  //  }
  //    const decodedmessage=await jwt.verify(token,"90517412hasi");
  //    const {_id}=decodedmessage;
  //    console.log("logged in user is:"+_id);
  //   //  res.send("reading cookie");
    // const user= await User.findById(_id);
    //  if(!user){
    //   throw new Error("user doesnot exist");
    //  }
        const user=req.user;

    res.send(user);
  }catch(err){
    res.status(400).send("error:"+err.message);
  }

  

//   try {
//     const decoded = jwt.verify(token, "90517412hasi");
//     console.log(decoded);
//     res.send("Reading cookies. User ID: " + decoded._id);
//   } catch (err) {
//     console.error("Invalid token:", err.message);
//     res.status(401).send("Invalid or expired token");
//   }
 });

// GET /users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).send("No users found");
    }
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
     console.log("sending connection request");
     const  user=req.user;
     res.send(user.firstName+"send connection request to");
})










// DELETE /user
app.delete("/user", async (req, res) => {
  const { firstName } = req.body;
  try {
    const user = await User.findOneAndDelete({ firstName });
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// PATCH /user
app.patch("/user", async (req, res) => {
  const { userId, password, ...updates } = req.body;

  try {
    const ALLOWED_UPDATES = ["gender", "firstName", "password"];
    const isUpdateAllowed = Object.keys(updates).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed for one or more fields");
    }

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).send("User not found");

    res.send("User updated successfully");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).send(err.message || "Something went wrong");
  }
});

// Start server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7412, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
