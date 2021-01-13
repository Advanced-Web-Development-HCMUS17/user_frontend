import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import Home from "./HomePage";
import {useAuth} from "./useAuth";
import Lobby from "./lobby/Lobby";
import UpdatePasswordPage from "./resetPassword/UpdatePasswordPage";
import ResetPasswordPage from "./resetPassword/ResetPasswordPage";
import {Button, LinearProgress} from "@material-ui/core";
import ProfilePage from "./ProfilePage";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Replay from "./replay/Replay";
import History from "./replay/History";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const PrivateRoute = ({component: Component, auth: isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => {
    if (isAuthenticated === null)
      return <LinearProgress/>
    if (isAuthenticated === true)
      return <Component {...props}/>;
    return <Redirect to='/login'/>
  }}/>
)

export default function IndexComponent({props}) {
  const {isAuth, userInfo} = useAuth();
  const [inviteUser, setInviteUser] = useState(null);
  const [inviteLobby, setInviteLobby] = useState(null);
  const history = useHistory();
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

  function handleJoin() {
    history.push(`/l/${inviteLobby}`);
    setOpen(false);
  }

  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" auth={isAuth} component={Home}/>
        <Route exact path="/register">{isAuth ? <Redirect to="/"/> : <Register/>}</Route>
        <Route exact path="/login">{isAuth ? <Redirect to="/"/> : <Login/>}</Route>
        <Route exact path="/login/:token">{isAuth ? <Redirect to="/"/> : <Login/>}</Route>
        <Route exact path="/reset-password/get-code" component={ResetPasswordPage}/>
        <Route exact path="/reset-password/:email/:code" component={UpdatePasswordPage}/>
        <PrivateRoute exact path="/l/:lobbyId" auth={isAuth} component={Lobby}/>
        <PrivateRoute exact path="/profile" auth={isAuth} component={() => ProfilePage(userInfo)}/>
        <PrivateRoute exact path="/history" auth={isAuth} component={History}/>
        <PrivateRoute exact path="/history/:lobbyId" auth={isAuth} component={Replay}/>
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
