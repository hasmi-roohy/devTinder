const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/User");
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
           toUserId:loggedInUser._id,
           status:"interested",

        }).populate("fromUserId",["firstName","lastName"]);
        res.json({
            message:"data fetched succesfully",
            data:connectionRequests,
        });

    }
    catch(err){
        req.statusCode(400).send({ERROR:err.message});
    }
});



  const USER_SAFE_DATA="firstName lastName ";
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
                 $or:[
                    {toUserId:loggedInUser._id,status:"accepted"},
            {     fromUserId:loggedInUser._id,status:"accepted"   },
                 ],
        }).populate("fromUserId",USER_SAFE_DATA);
        console.log(connectionRequests);
         const data=connectionRequests.map((row)=>
            {    if(row.fromUserId._id.toString()===loggedInUser._id .toString() ){
                  return row.toUserId;
            }
               return  row.fromUserId;}
            );
        res.json({data});
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
})

// ✅ import

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
     limit=limit>50?50:limit;
    const skip=(page-1)*limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId status");
    //.populate("fromUserId","firstName").populate("toUserId","firstName");

    //const userIds = new Set();
    // connectionRequests.forEach(req => {
    //   if (req.fromUserId.toString() !== loggedInUser._id.toString()) {
    //     userIds.add(req.fromUserId.toString());
    //   }
    //   if (req.toUserId.toString() !== loggedInUser._id.toString()) {
    //     userIds.add(req.toUserId.toString());
    //   }
    // });

    // const connectedUsers = await User.find({ _id: { $in: [...userIds] } })
    //   .select("firstName lastName email");

         const hideUsersFromFeed=new Set();
         connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());

         });
         console.log(hideUsersFromFeed);
       


         const users=await User.find(
 {
  _id: { 
    $nin: Array.from(hideUsersFromFeed), 
    $ne: loggedInUser._id 
  }
}).select(USER_SAFE_DATA).skip(skip).limit(limit);


    res.status(200).json({
      message: "Feed fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports=userRouter;