import React, {useContext, useEffect, useState} from 'react';

import {io} from "socket.io-client";
import {useAuth} from "../useAuth";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const SocketContext = React.createContext({
  socket: null,
  isInitialized: false
});

const {Provider} = SocketContext;

export function SocketProvider({children}) {
  const {token,isAuth} = useAuth();
  const [socket, setSocket] = useState(null);
  const [isInitialized, setIsInitialized] = useState(0);

  useEffect(() => {

    const sock = io(SOCKET_URL, {auth: {token: token}});
    setSocket(sock);
    if (token) {
      setIsInitialized(1);
    } else {
      setIsInitialized(2);
    }
    return () => {
      sock.disconnect();
    }
  }, [isAuth]);

  return (<Provider
    value={{socket, isInitialized}}>{children}</Provider>)
}

export const useSocket = () => useContext(SocketContext);
