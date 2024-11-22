import React, { useContext, useEffect, useRef, useState } from "react";
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
import Loader from "../../common/Loader";
import { SocketContext } from "../../../context/socketContext";
import Avatar from "../../../assets/avatar.png";

function SingleChat() {
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);
  const { chat, chatHistory } = useSelector((state) => state.chats);
  const { user, token } = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (chat && chat._id) {
      dispatch(getChatHistory(chat._id, token, setLoading));
      if (socket) {
        socket.emit("joinRoom", chat._id);
      }
    }
  }, [chat, socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]); // Scroll only when chatHistory changes
  useEffect(() => {
    // Check if the socket is available
    if (!socket) return;
  
    // Function to handle incoming messages
    const handleMessageReceived = (messageReceived) => {
      // Ignore messages sent by the current user
      if (messageReceived.senderId === user._id) {
        return;
      }
  
      // If no active chat or chat IDs don't match, trigger notifications
      if (!chat || chat._id !== messageReceived.chatId) {
        // Trigger notification logic here
        console.log("Notification: New message received!");
      } else {
        // Update chat history for the active chat
        const updatedChatHistory = [...chatHistory, messageReceived];
        dispatch(setChatHistory(updatedChatHistory));
      }
    };
  
    // Setting up the Socket.IO listener
    socket.on("message-received", handleMessageReceived);
  
    // Cleanup listener when the component unmounts or socket changes
    return () => {
      socket.off("message-received", handleMessageReceived);
    };
  }, [socket, user._id, chat, chatHistory, dispatch]);
  
  const sendMessageHandler = async (data) => {
    const formObj = {
      chatId: chat._id,
      content: data.content,
      senderId: user._id,
      timestamp: new Date(),
    };

    dispatch(sendMessage(formObj, token, chatHistory));
    socket.emit("sendMessage", formObj);

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
      <div className="w-auto h-[82vh] md:h-full  flex flex-col border border-gray-200 rounded-lg relative max-sm:-ml-2 ">
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
                    src={participant.profilePicture || Avatar}
                  />
                  <div className="flex flex-col gap-2  ml-3   justify-center ">
                    <p className="text-lg font-semibold">{participant.name}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {" "}
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
              <Button
                className="h-fit  mt-1"
                type="submit"
                text="Send"
              ></Button>
            </form>
          </>
        )}
        {/* ScrollableChat */}
      </div>
    );
  }
}

export default SingleChat;
