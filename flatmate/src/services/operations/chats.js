import { apis } from "../apis";
import axios from "axios";
import { setLoading } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import {
  setChat,
  setChatHistory,
  setUserChats,
} from "../../redux/slices/chatsSlice";

const { CREATE_CHAT, FETCH_USER_CHAT, SEND_MESSAGE, GET_CHAT_HISTORY } = apis;

export function createChat(user2Id, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        CREATE_CHAT,
        { user2Id },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        //   toast.success(response.data.message);
        // console.log(response.data);
        dispatch(setChat(response.data.chat));
        console.log(response.data.chat);
        dispatch(setLoading(false));

        navigate("/all/chats");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };
}
export function sendMessage(formObj, token, chatHistory) {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    // console.log(user2ID) ;
    try {
      const response = await axios.post(SEND_MESSAGE, formObj, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // console.log(response.data.chats);

      if (response.data.success) {
        //   toast.success(response.data.message);
        // dispatch(setUserChats(response.datad));
        dispatch(setChatHistory([...chatHistory, response.data.newMessage]));
        dispatch(setLoading(false));

        //   navigate("/");
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };
}

export function fetchUserChats(userId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log(user2ID) ;
    try {
      const response = await axios.get(
        FETCH_USER_CHAT + `/user/${userId}/chats`,
        null,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.chats);

      if (response.data.success) {
        //   toast.success(response.data.message);
        console.log(response.data.chats);
        dispatch(setUserChats(response.data.chats));
        dispatch(setLoading(false));

        //   navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };
}

export function getChatHistory(chatId, token, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    // console.log(user2ID) ;
    try {
      const response = await axios.get(
        GET_CHAT_HISTORY + `/${chatId}/history`,
        null,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.chat);
      // console.log(response.data.);
      if (response.data.success) {
        //   toast.success(response.data.message);
        dispatch(setChatHistory(response.data.chat.messages));
        setLoading(false);

        //   navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
}
