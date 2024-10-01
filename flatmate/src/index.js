import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketContextProvider from "./context/socketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContextProvider>
    <Provider store={store}>
      <App />

      <ToastContainer />
    </Provider>
  </SocketContextProvider>
);
