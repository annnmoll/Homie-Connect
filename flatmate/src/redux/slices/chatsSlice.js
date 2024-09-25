import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userChats: [],
  chat: null,
  chatHistory: [],
  //   details : null
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserChats, setChat, setChatHistory } = chatsSlice.actions;

export default chatsSlice.reducer;
