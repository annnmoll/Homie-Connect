const express = require("express");
const dbConnect = require("./config/dbConnect");
const cloudinaryConnect = require("./config/cloudinaryConfig");
const Chat = require("./models/chatSchema");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const fileUpload = require("express-fileupload");
const socketIo = require("socket.io");

const app = express();
const http = require("http");
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*", // Replace with the front-end origin
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/chat", chatRoutes);

server.listen(PORT, () => {
  console.log(`Server started at PORT = ${PORT}`);
});
app.get("/", (req, res) => {
  res.json("Backend is working fine");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log(socket.id, "socket");

  // Join a chat room
  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Listen for new messages
  socket.on("sendMessage", async (message) => {
    const { participants } = await Chat.findById(message.chatId);
    if (!participants) {
      console.log("participants not defined");
      return;
    }

    participants.forEach((user) => {
      if (String(user) === String(message.senderId)) {
        return;
      }
      console.log("Receiving", user);
      io.emit("message-received", message);
    });
    // io.to(message.chatId).emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

dbConnect();
cloudinaryConnect();
