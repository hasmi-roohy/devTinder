const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth"); // ✅ Fixed path
const ConnectionRequest=require("../models/connectionRequest");
const User = require("../models/User");
// POST /sendConnectionRequest (Protected)
requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res,next) => {
  try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
         return res.status(400).json({message:"invalid status type"});
        }

     const existingConnectionRequest=await ConnectionRequest.findOne({
      $or:[{  fromUserId,
      toUserId},
    {fromUserId:toUserId,toUserId:fromUserId}]
    
     });
     if(existingConnectionRequest){
      res.status(400).send({message:"already this request exists"});
     }
  const toUser = await User.findById(toUserId);
if (!toUser) {
  res.status(400).send({ message: "user in not present in database" });
}

         const connectionRequest=new ConnectionRequest({
          fromUserId,toUserId,status,
         });
         const data=await connectionRequest.save();
         res.json({
          message:"Coonection request sent succesfully",
          data,
         })
  }catch(err){
   // res.status(400).send("ERROR"+err.message);
    next(err);
  }
});
 requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res,next)=>{
    try{
  const loggedInUser=req.user;
  const {status, requestId}=req.params;
  const allowedStatus=["accepted","rejected"];
  if(!allowedStatus.includes(status)){
    res.status(400).json({message:"status is not allowed"});
  }
  const connectionRequest=await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedInUser._id,
    status:"interested"
  });
 if (!connectionRequest) {
  return res.status(404).json({ message: err.message });
}

  connectionRequest.status=status;
  const data=await connectionRequest.save();
  res.json({message:"connection request"+status,data});
    }catch(err){
       // res.status(400).send("error here");
        next(err);
    }

 })
module.exports = requestRouter;
