import React from "react";
import MyChats from "../components/core/chats/MyChats";
import SingleChat from "../components/core/chats/SingleChat";
import { useSelector } from "react-redux";

function Chats() {
  const { chat } = useSelector((state) => state.chats);
  return (
    <div className=" w-[96%] h-full  grid-rows-[100%] mx-auto p-5 gap-5 grid md:grid-cols-[30%_70%] overflow-hidden ">
      {/* <SideDrawer /> */}
      {/* SideDrawer */}
      <div className={`${!chat ? "max-md:block" : "max-md:hidden"}`}>
        <MyChats />
      </div>
      <div className={`${chat ? "max-md:block" : "max-md:hidden"}`}>
        <SingleChat />
      </div>
      {/* ChatBox */}
    </div>
  );
}

export default Chats;
