import React, {useContext, useState, useEffect} from 'react';
import {useSocket} from "../useSocket";
import {useAuth} from "../useAuth";
import {io} from "socket.io-client";

const USER_EVENT = {
  ONLINE: 'user/online',
  OFFLINE: 'user/offline',
}
const LIST_ONLINE_USER_EVENT = 'onlineUserList';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;


const UserStatusContext = React.createContext({
  usersOnline: [],
});

const {Provider} = UserStatusContext;

export function UserStatusProvider({children}) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {token} = useAuth();

  const [socket, setSocket] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
      setSocket(io(SOCKET_URL, {auth: {token: token}}));
      setIsInitialized(true);
    }
    , [token])

  useEffect(() => {
    if (socket) {
      socket.on(USER_EVENT.ONLINE, (message) => {
        const {id, user} = message;
        console.log("USER_EVENT.ONLINE", message);
        setOnlineUsers(onlineUsers.concat([{id: id, user: user}]));
      });

      socket.on(LIST_ONLINE_USER_EVENT, (listUsers) => {
        console.log(listUsers);

        let users = [];
        for (let key in listUsers) {
          users.push({id: key, user: listUsers[key]});
        }
        setOnlineUsers(users);
      });

      socket.on(USER_EVENT.OFFLINE, (message) => {

        const {id} = message;

        setOnlineUsers(onlineUsers.filter(user => user.id !== id));

      });
    }
  }, [socket]);


  return (<Provider value={onlineUsers}>{children}</Provider>);
}

export const useUserStatus = () => useContext(UserStatusContext);

