import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import Button from "@material-ui/core/Button";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import UserStatus from "./userStatus/UserStatus";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Leaderboard from "./leaderboard/Leaderboard";
import LobbyList from "./LobbyList/LobbyList";
import NavigationBar from "./NavigationBar";
import FormDialog from "./dialog/FormDialog";
import {makeStyles} from "@material-ui/styles";
import {ExitToApp, FlashOnRounded, LibraryAdd} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingInline: "25px",
  },
  btnGroup: {
    marginTop: "10px",
  },
  btnCreate: {
    backgroundColor: "#00AC47",
    color: "white",
    fontWeight: "bolder",
  },
  btnJoin: {
    backgroundColor: "#2684FC",
    color: "white",
    fontWeight: "bolder",
  }
}));

export default function Home({userInfo}) {

  const history = useHistory();

  const {socket, isInitialized} = useSocket();
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState('');
  const classes = useStyle();

  function createBoard() {
    if (isInitialized) {
      socket.emit(LOBBY_EVENT.CREATE_LOBBY);
    }
  }

  function findMatch() {
    if (isInitialized) {
      socket.emit(LOBBY_EVENT.FIND_LOBBY);
    }
  }

  useEffect(() => {
    socket.on(LOBBY_EVENT.CREATE_LOBBY, ({roomId, player}) => {
      history.push(`/l/${roomId}`);
    });
    socket.on(LOBBY_EVENT.LOBBY_FOUND, ({competitor, roomId}) => {
      history.push(`/l/${roomId}`);
    });
  }, [isInitialized]);

  return (
    <>
      <NavigationBar/>
      <Grid container alignItems={"flex-end"} direction={"column"}><Box p={2}>
        <Grid container>
          <Grid item>
            <Button variant="contained" startIcon={<LibraryAdd/>} onClick={createBoard}
                    className={classes.btnCreate}>
              Create room
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<ExitToApp/>} onClick={() => setOpen(true)}
                    className={classes.btnJoin}>
              Join game
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<FlashOnRounded/>} onClick={findMatch}
                    className={classes.btnCreate}>
              Quick Match
            </Button>
          </Grid>
        </Grid>
      </Box></Grid>
      <Grid container alignItems={"flex-start"} direction={"row"}>
        <Grid item md={4}><UserStatus/></Grid>
        <Grid item md={4}><LobbyList/></Grid>
        <Grid item md={4}><Leaderboard/></Grid>
      </Grid>
      <FormDialog
        open={open}
        title="Join game"
        content="Please enter Room ID"
        label="RoomID"
        handleClose={() => setOpen(false)}
        handleTextChange={(event) => setRoomId(event.target.value)}
        handleSubmit={() => history.push(`/l/${roomId}`)}
      />
    </>
  );
}
