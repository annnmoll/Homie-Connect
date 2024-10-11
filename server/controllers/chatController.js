const Chat = require("../models/chatSchema");
const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

// 1. Start a new chat
exports.startChat = async (req, res) => {
  try {
    const user1Id = req.user.userId;
    const { user2Id } = req.body;
    console.log(req.body);
    console.log(user1Id);
    console.log(user2Id);

    // Validate that both users exist
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);

    if (!user1 || !user2) {
      return res
        .status(404)
        .json({ success: false, message: "One or both users not found." });
    }

    // Check if a chat between these users already exists
    let existingChat = await Chat.findOne({
      participants: { $all: [user1Id, user2Id] },
    })
      .select("name email participants _id")
      .populate("participants");

    if (existingChat) {
      return res
        .status(200)
        .json({ success: true, message: "", chat: existingChat });
    }

    // Create a new chat
    const newChat = new Chat({
      participants: [user1Id, user2Id],
    });

    const savedChat = await newChat.save();

    // Add chat reference to both users
    user1.chats.push(savedChat._id);
    user2.chats.push(savedChat._id);
    await user1.save();
    await user2.save();

    res.status(201).json({
      success: true,
      message: "Chat created successfully.",
      chat: savedChat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error,
    });
  }
};

// 2. Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, content } = req.body;

    // Validate content
    if (!content || content.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Message content cannot be empty." });
    }

    // Validate sender
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found." });
    }
    // Find chat
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    // Check if the sender is a participant in the chat
    if (!chat.participants.includes(senderId)) {
      return res
        .status(403)
        .json({ message: "You are not a participant in this chat." });
    }

    // Create and save the message
    const newMessage = new Message({
      sender: senderId,
      content,
    });

    await newMessage.save();

    // Add the message to the chat
    chat.messages.push(newMessage._id);
    chat.lastMessageAt = new Date();

    await chat.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      newMessage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};

// 3. Fetch chat history
exports.getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find the chat and populate messages and participants
    const chat = await Chat.findById(chatId)
      .populate("messages")
      .populate("participants", "name email")
      .sort({ lastMessageAt: -1 });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};

// 4. Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // Find the chat
    const chat = await Chat.findById(chatId).populate("messages");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    // Check if the user is a participant in the chat
    if (!chat.participants.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You are not a participant in this chat." });
    }

    // Mark all unread messages as read for this user
    const updatedMessages = chat.messages.map((message) => {
      if (!message.read && String(message.sender) !== userId) {
        message.read = true;
        return message.save();
      }
      return message;
    });

    await Promise.all(updatedMessages);

    res.status(200).json({ message: "Messages marked as read." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};

// 5. Fetch user chats
exports.getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "fethcing chats");

    // Validate user
    const user = await User.findById(userId).populate({
      path: "chats",
      populate: {
        path: "participants",
        select: "name email profilePicture",
      },
      select: "participants lastMessageAt",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user && user.chats) {
      user.chats.sort(
        (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
      );
    }

    res.status(200).json({ success: true, chats: user.chats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};
