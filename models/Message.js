import mongoose from 'mongoose'

const messageSchema=mongoose.Schema({
    sender:String,
    reciever:String,
    message:String
},
{timestamps:true}
);

const message=mongoose.model("Message",messageSchema);
export default message;