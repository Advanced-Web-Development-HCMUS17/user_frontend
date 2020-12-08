import React, {useContext, useEffect, useState} from 'react';

import {io} from "socket.io-client";
import {useAuth} from "./useAuth";

const SOCKET_URL = "ws://localhost:3030";

const SocketContext = React.createContext({
  socket: null
});

const {Provider} = SocketContext;

export function SocketProvider({children}) {


  const {token, isAuth} = useAuth();
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    setSocket(io(SOCKET_URL, {auth: {token: token}}));
  }, [isAuth, token])

  return (<Provider
    value={socket}>{children}</Provider>)
}

export const useSocket = () => useContext(SocketContext);
