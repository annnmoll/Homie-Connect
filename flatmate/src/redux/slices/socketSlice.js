import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Replace with your server URL

const initialState = {
  socket: socket,
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
