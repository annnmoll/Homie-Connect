import { createContext, useState } from "react";

export const SocketContext = createContext();

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const value = { socket, setSocket };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export default SocketContextProvider;
