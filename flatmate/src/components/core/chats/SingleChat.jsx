import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setChatHistory } from "../../../redux/slices/chatsSlice";
import NoChat from "../../../lotties/Chat.json";
import { lottieOptions } from "../../../utils/lottieOption";
import Lottie from "react-lottie";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { useForm } from "react-hook-form";
import {
  getChatHistory,
  sendMessage,
} from "../../../services/operations/chats";

function SingleChat() {
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);
  const { chat, chatHistory } = useSelector((state) => state.chats);
  const { user, token } = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.auth);
  console.log(chatHistory, "chatHistory");
  useEffect(() => {
    if (chat && chat._id) {
      dispatch(getChatHistory(chat._id, token, setLoading));
      socket.emit("joinRoom", chat._id);
    }
  }, [chat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]); // Scroll only when chatHistory changes

  useEffect(() => {
    console.log("Component rendered");

    // Check if the socket is available
    if (socket) {
      console.log("Socket available, setting up listener...");

      // Listen for incoming messages
      const handleMessageReceived = (messageReceived) => {
        console.log("Message received:", messageReceived);
        if (messageReceived.senderId == user._id) {
          return;
        }

        // If no active chat or chat IDs don't match, trigger notifications
        if (!chat || chat._id !== messageReceived.chatId) {
          // Trigger notification logic
          console.log("Show notification for new message");
        } else {
          // Active chat, update messages
          console.log("New message for active chat:", messageReceived);
          // Logic to update messages here, e.g. setMessages(prev => [...prev, messageReceived]);
          const newChat = [...chatHistory, messageReceived];
          dispatch(setChatHistory(newChat));
        }
      };

      // Setting up the listener
      socket.on("message-received", handleMessageReceived);

      // Cleanup listener when component unmounts or socket changes
      // return () => {
      //   socket.off("message-received", handleMessageReceived);
      //   console.log("Cleaned up socket listener");
      // };
    }
  });

  const sendMessageHandler = async (data) => {
    const formObj = {
      chatId: chat._id,
      content: data.content,
      senderId: user._id,
      timestamp: new Date(),
    };

    dispatch(sendMessage(formObj, token, chatHistory));
    socket.emit("sendMessage", formObj);

    // console.log(chatHistory);

    reset();
  };

  if (!chat) {
    return (
      <div className="w-auto h-full flex flex-col justify-center items-center border border-gray-200 rounded-lg relative max-sm:-ml-2 ">
        <Lottie
          options={lottieOptions(NoChat)}
          style={{ objectFit: "contain", height: "220px", maxWidth: "500px" }}
        />
        <p className="text-lg"> Select a chat to continue chatting</p>
      </div>
    );
  }
  if (chat) {
    return (
      <div className="w-auto h-full flex flex-col border border-gray-200 rounded-lg relative max-sm:-ml-2 ">
        {/* Chat Header */}
        <div className="bg-gray-200 rounded-t-lg  flex  items-center pl-2  ">
          <MdKeyboardArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => dispatch(setChat(null))}
          />
          {chat?.participants?.map((participant) => {
            if (participant._id != user._id) {
              return (
                <div
                  className=" py-2 px-4 pl-2 w-auto flex gap-3"
                  key={participant._id}
                >
                  <img
                    className="h-[50px] w-[50px] rounded-full object-cover"
                    src={participant.profilePicture}
                  />
                  <div className="flex flex-col gap-2  ml-3   justify-center ">
                    <p className="text-lg font-semibold">{participant.name}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* ScrollableChat */}
        <div
          ref={chatContainerRef}
          className="flex  h-full flex-col gap-1 px-2 md:px-4 overflow-y-auto pt-2 mt-5 mb-16 pb-5 hide-scrollbar"
        >
          {chatHistory?.map((message) => {
            return (
              <div
                key={message._id}
                className={`flex flex-col w-full overflow-
                  ${
                    message.sender !== user._id
                      ? `self-start bg-gray-200`
                      : "self-end bg-green-300"
                  } px-2 md:px-5 py-2 rounded-md max-md:max-w-[250px] max-w-[70%] md:min-w-[40%] `}
              >
                <p className="message w-fit max-w-full text-ellipsis overflow-auto ">
                  {message.content}
                </p>
                <p
                  className={`${
                    message.sender !== user._id ? `self-start` : " self-end"
                  } text-xs mt-1  text-gray-500 w-fit `}
                >
                  {new Date(message?.timestamp).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit(sendMessageHandler)}
          className="w-full flex gap-2 px-2 pr-4 justify-between  absolute bottom-0 pt-2"
        >
          <Input
            placeholder="Type a message"
            className="!m-0"
            {...register("content", { required: true })}
          />
          <Button className="h-fit  mt-1" type="submit" text="Send"></Button>
        </form>
      </div>
    );
  }
}

export default SingleChat;
