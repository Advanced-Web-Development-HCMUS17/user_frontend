import React, {useContext, useEffect, useState} from 'react';

import {io} from "socket.io-client";

const SOCKET_URL = "ws://localhost:3030";

const SocketContext = React.createContext({
  socket: null
});

const {Provider} = SocketContext;

export function SocketProvider({children}) {


  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(SOCKET_URL));
  }, []);
  return (<Provider
    value={socket}>{children}</Provider>)
}

export const useSocket = () => useContext(SocketContext);
