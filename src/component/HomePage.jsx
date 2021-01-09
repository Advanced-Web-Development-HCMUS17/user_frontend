import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import Button from "@material-ui/core/Button";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import UserStatus from "./userStatus/UserStatus";
import NavigationBar from "./NavigationBar";
import FormDialog from "./dialog/FormDialog";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ExitToApp, LibraryAdd} from "@material-ui/icons";

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

export default function Home() {
  const {socket, isInitialized} = useSocket();
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState('');
  const history = useHistory();
  const classes = useStyle();

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
    <>
      <NavigationBar/>
      <Grid container direction="row" spacing={5} className={classes.root}>
        <Grid container direction="column" item xs={8} spacing={2} className={classes.btnGroup}>
          <Grid item>
            <Button variant="contained" startIcon={<LibraryAdd/>} onClick={createBoard}
                    className={classes.btnCreate}>
              Create Board
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<ExitToApp/>} onClick={() => setOpen(true)}
                    className={classes.btnJoin}>
              Join game
            </Button>
          </Grid>
        </Grid>
        <Grid item xs>
          <UserStatus/>
        </Grid>
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
