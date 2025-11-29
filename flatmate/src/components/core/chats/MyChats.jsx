import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChats } from "../../../services/operations/chats";
import Loading from "../../common/Loading";
import { setChat } from "../../../redux/slices/chatsSlice";
import Avatar from "../../../assets/avatar.png";
function MyChats() {
  const { user, token, loading, error } = useSelector((state) => state.user);
  const { userChats, chat: selectedChat } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserChats(user._id, token));
  }, [user, token, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading chats: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-xl font-bold">All Chats</h1>
      <div className="overflow-auto overflow-x-hidden hide-scrollbar rounded-lg flex flex-col gap-1">
        {userChats?.map((chat) => (
          <div
            onClick={() => {
              if (selectedChat && selectedChat._id == chat._id) {
                return;
              }
              dispatch(setChat(chat));
            }}
            key={chat._id}
            className={`bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg hover:scale-[1.02] transition-all duration-75 ${
              selectedChat && chat._id == selectedChat._id
                ? "bg-green-300 hover:bg-green-400 "
                : ""
            }`}
          >
            {chat?.participants
              ?.filter((participant) => participant._id !== user._id)
              .map((participant) => (
                <div
                  className="py-2 px-4 h-[90px] pl-2 w-auto flex gap-3 items-center max-sm:h-[70px]"
                  key={participant._id}
                >
                  <img alt =""
                    className="h-[75px] w-[75px] rounded-full object-cover max-sm:w-[50px] max-sm:h-[50px]"
                    src={participant.profilePicture || Avatar}
                  />
                  <div className="flex flex-col gap-1 ml-3 overflow-hidden">
                    <p className="text-lg font-semibold capitalize">{participant.name}</p>
                    <p className="max-lg:hidden w-auto overflow-hidden text-ellipsis">
                      {participant.email}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyChats;
