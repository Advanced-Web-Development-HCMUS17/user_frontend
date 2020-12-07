import React, {useContext, useState, useEffect} from 'react';
import {useSocket} from "../useSocket";

const USER_EVENT = {
  ONLINE: 'user/online',
  OFFLINE: 'user/offline',
}
const LIST_ONLINE_USER_EVENT = 'onlineUserList';


const UserStatusContext = React.createContext({
  usersOnline: [],
});

const {Provider} = UserStatusContext;

export function UserStatusProvider({children}) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useSocket();
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

  return (<Provider value={onlineUsers}>{children}</Provider>);
}

export const useUserStatus = () => useContext(UserStatusContext);

