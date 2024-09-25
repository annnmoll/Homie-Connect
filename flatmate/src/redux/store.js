import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import listingReducer from "./slices/listings";
import chatsReducer from "./slices/chatsSlice";
import socketReducer from "./slices/socketSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    listings: listingReducer,
    chats: chatsReducer,
    socket: socketReducer,
  },
});
