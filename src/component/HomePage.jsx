import React, {useEffect} from 'react';

import Header from "./Header";
import {useHistory} from 'react-router';
import Button from "@material-ui/core/Button";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import UserStatus from "./userStatus/UserStatus";

export default function Home({userInfo}) {

  const history = useHistory();

  const {socket, isInitialized} = useSocket();

  function createBoard() {
    if (isInitialized) {
      socket.emit(LOBBY_EVENT.CREATE_LOBBY);
    }
  }

  useEffect(() => {
    socket.on(LOBBY_EVENT.CREATE_LOBBY, ({roomId, player}) => {
      history.push(`/l/${roomId}`);
    })
  }, [isInitialized]);
  return (
    <div>
      <UserStatus/>
      <Button color={"primary"} variant={"outlined"} onClick={createBoard}>Create Board</Button>
    </div>
  );
}
