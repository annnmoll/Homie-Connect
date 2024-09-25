const express = require("express");
const router = express.Router();
const {
  startChat,
  getUserChats,
  sendMessage,
  getChatHistory,
  markMessagesAsRead,
} = require("../controllers/chatController");
const isAuthenticated = require("../middlewares/auth");

router.post("/create", isAuthenticated, startChat);
router.get("/user/:userId/chats", getUserChats); // Get user chats
router.post("/send-message", sendMessage); // Send a message
router.get("/:chatId/history", getChatHistory); // Get chat history
router.post("/mark-read", markMessagesAsRead); 

module.exports = router;
