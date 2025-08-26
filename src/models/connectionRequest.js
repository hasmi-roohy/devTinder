const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
          
       values: ["ignore", "interested", "accepted", "rejected"],


            message:"{VALUE} is not supported"
        },
    },
},
{
    timestamps:true
});
   //connectionRequestSchema.index({fromUserId:1,toUserId});





// connectionRequestSchema.pre("save",function (){
//     const connectionRequest=this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error("u cannot send connection requests");
//     }
//     next();
// })



const ConnectionRequestModel=new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);
module.exports=ConnectionRequestModel;