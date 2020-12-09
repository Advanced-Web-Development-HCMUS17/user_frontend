import React, {useContext, useEffect, useState} from 'react';

import {io} from "socket.io-client";
import {useAuth} from "./useAuth";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const SocketContext = React.createContext({
  socket: null,
  isInitialized: false
});

const {Provider} = SocketContext;

export function SocketProvider({children}) {


  const {token, isAuth} = useAuth();
  const [socket, setSocket] = useState(null);


  useEffect(() => {

  }, [token])

  return (<Provider
    value={{socket}}>{children}</Provider>)
}

export const useSocket = () => useContext(SocketContext);
