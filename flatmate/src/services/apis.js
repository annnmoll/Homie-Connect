// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://homie-connect.vercel.app";

export const apis = {
  SIGNUP: BASE_URL + `/register`,
  LOGIN: BASE_URL + `/login`,
  UPDATE_PROFILE: BASE_URL + `/update/myProfile`,
  VALIDATE_OTP: BASE_URL + `/validate`,
  REGISTER_USER: BASE_URL + "/createuser",
  FORGOT_PASSWORD: BASE_URL + "/forgot",
  RESET_PASSWORD: BASE_URL + "/reset",

  CREATE_LISTING: BASE_URL + `/api/listing/create`,
  GET_LISTING_BY_LOCATION: BASE_URL + `/api/listing/listings`,
  DELETE_LISTING: BASE_URL + `/api/listing/listing`,

  CREATE_CHAT: BASE_URL + `/api/chat/create`,
  FETCH_USER_CHAT: BASE_URL + `/api/chat`,
  SEND_MESSAGE: BASE_URL + `/api/chat/send-message`,
  GET_CHAT_HISTORY: BASE_URL + `/api/chat`,
};
