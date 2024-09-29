import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { BASE_URL } from "../../services/apis";

// const socket = io(BASE_URL); // Replace with your server URL

const initialState = {
  socket: null,
  messages: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { receiveMessage, clearMessages } = socketSlice.actions;

export default socketSlice.reducer;
