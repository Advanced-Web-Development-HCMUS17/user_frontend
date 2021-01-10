import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import Home from "./HomePage";
import {useAuth} from "./useAuth";
import Lobby from "./lobby/Lobby";
import UserStatus from "./userStatus/UserStatus";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import InvitationSnackBar from "./lobby/InvitationSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {Button} from "@material-ui/core";
import NavigationBar from "./NavigationBar";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function IndexComponent({props}) {
  const history = useHistory();

  const [inviteUser, setInviteUser] = useState(null);
  const [inviteLobby, setInviteLobby] = useState(null);

  const {socket, isInitialized} = useSocket();
  useEffect(() => {
      if (socket) {
        socket.on(LOBBY_EVENT.INVITE, ({inviteUser, lobbyId}) => {
          console.log("INVITATION ", JSON.stringify(inviteUser), lobbyId);
          setInviteUser(inviteUser);
          setInviteLobby(lobbyId);
          handleClick();
        });
      }
    }
    , [isInitialized]);


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const {userInfo} = useAuth();

  function handleJoin() {
    history.push(`/l/${inviteLobby}`);
    setOpen(false);
  }

  return (
    <>
      <Switch>
        <Route exact path="/register">
          {
            userInfo ?
              <Redirect to="/"/> :
              <Register/>
          }
        </Route>

        <Route exact path="/login">
          {
            userInfo ?
              <Redirect to="/"/> :
              <Login/>
          }
        </Route>
        <Route exact path="/">
          {
            userInfo ?
              <Home userInfo={userInfo}
              /> :
              <Redirect to="/register"/>
          }
        </Route>
        <Route path={"/l/:lobbyId"}>
          <Lobby/>
        </Route>
      </Switch>
      {inviteUser && <Snackbar open={open} autoHideDuration={30000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"info"}>
          Loser {inviteUser.username} has invited you for a duel <Button variant={"outlined"} color={"inherit"}
                                                                         size={"small"} onClick={handleJoin}>Take the
          challenge</Button>
        </Alert>
      </Snackbar>}
    </>
  )
}
