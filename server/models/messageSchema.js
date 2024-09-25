const mongoose = require("mongoose") ;
const {Schema} = mongoose ; 

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user who sent the message
    content: { type: String, required: true }, // The message content
    timestamp: { type: Date, default: Date.now }, // Time when the message was sent
    read: { type: Boolean, default: false }, // Whether the message has been read
  },{
    timestamps : true 
  });

  
module.exports = mongoose.model("Message" , messageSchema) ; 