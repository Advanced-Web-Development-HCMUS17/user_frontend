import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from "@material-ui/core/Button";
import { useSocket } from "./socketHook/useSocket";
import { LOBBY_EVENT } from "./socketHook/EventConstant";
import UserStatus from "./userStatus/UserStatus";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Leaderboard from "./leaderboard/Leaderboard";
import LobbyList from "./LobbyList/LobbyList";

export default function Home({userInfo}) {

  const history = useHistory();

  const { socket, isInitialized } = useSocket();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [roomId, setRoomId] = useState('');

  function createBoard() {
    if (isInitialized) {
      socket.emit(LOBBY_EVENT.CREATE_LOBBY);
    }
  }

  useEffect(() => {
    socket.on(LOBBY_EVENT.CREATE_LOBBY, ({ roomId, player }) => {
      history.push(`/l/${roomId}`);
    })
  }, [isInitialized]);

  const handleClose = () => {
    setDialogIsOpen(false);
  };
  const handleOpen = () => {
    setDialogIsOpen(true);
  };
  const handleJoin = () => {
    history.push(`/l/${roomId}`);
  }
  const handleTextChange = (event) => {
    setRoomId(event.target.value);
  }

  return (
    <div>
      <Grid container alignItems={"flex-end"} direction={"column"}><Box p={2}>
        <Grid container>
          <Grid item>
            <Box>
              <Button color={"primary"} variant={"contained"} onClick={createBoard}>Create Board</Button>
            </Box>
          </Grid>
          <Grid item>
            <Box px={2}>
              <Button variant={"contained"} color={"secondary"} onClick={handleOpen}>Join game</Button>
            </Box>
          </Grid>
        </Grid>
      </Box></Grid>
      <Grid container alignItems={"flex-start"} direction={"row"}>
        <Grid item md={4}><UserStatus/></Grid>
        <Grid item md={4}><LobbyList/></Grid>
        <Grid item md={4}><Leaderboard/></Grid>
      </Grid>
      <Dialog open={dialogIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter Room ID.
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="roomID"
              label="Room ID"
              type="text"
              fullWidth
              variant='outlined'
              onChange={handleTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleJoin} color="primary">
              Join
          </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
