const mongoose = require("mongoose") ;
const {Schema} = mongoose ; 


const chatSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }], // Users involved in the chat
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], // Array of messages in the chat
    createdAt: { type: Date, default: Date.now }, // Time when the chat was created
    lastMessageAt: { type: Date, default: Date.now }, // Time of the last message sent in the chat
  } , {
    timestamps : true 
  });
  
  module.exports = mongoose.model('Chat', chatSchema);