
const express = require("express");

const app = express();


// app.get("/profile/:name/:password", (req,res) => {
//     console.log(req.params);

//     res.send(req.url);
// })

// app.use("/home",
//     (req,res,next)=>{
//            console.log("1st respose");
//   res.send("holaa");
//     next();
 
// },
// (req,res)=>{
//      console.log("2nd response");
//     res.send("im so loving this");
   
// })

// app.use("/home/profile", (req,res) => {

//     res.send("profile");
// })

// app.use("/home", (req,res) => {
//    res.send({"name":"hamsi"});
// })

// app.use("/test", (req,res) => {

//     console.log(req.query);
//     res.send(req.query);
// })

// app.use("/", (req, res) => {
//     res.status(401).send("Hasmi");
// })



// import express from "express";
// import path from "path";
// const app=express();
// const staticPath = path.join(import.meta.dirname,"src.index.html");
// app.use(express.static(staticPath));
// app.use(express.urlencoded());
// app.post("/contact",(req,res)=>{
//     console.log(req.body);
//     res.send("ok");
// })
// app.listen(3000,()=>{
//     console.log("server logged on port 3000");
// });
// app.use("/admin",(req,res,next)=>{
//     console.log("it is admin");
//     const token="xyz";
//     const isauth=token==="xy";
//     if(!isauth){
//         res.send("i made a wrong token");
//     }


//     else{
//         next();
//     }
// });
// app.get("/admin/getAllData",(req,res)=>{
//    // const token=req.body?.token;
// //    const token="xyz";
// //     const isAdminauthorised=token ==="xyz";
// //     if(isAdminauthorised){
// //         res.send("all data is sent");
// //     }
// //     else{
// //         res.send(401).send("unauthorised request");
// //     }
//         res.send("ik");
// });
// app.use("/",(err,req,res,next)=>{
//      if(err){
//         res.send("some unknown error camae in middle");
//      }
// });




// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });




