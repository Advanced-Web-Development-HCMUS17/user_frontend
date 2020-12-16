import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import Button from "@material-ui/core/Button";
import {useSocket} from "./socketHook/useSocket";
import {LOBBY_EVENT} from "./socketHook/EventConstant";
import UserStatus from "./userStatus/UserStatus";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";

export default function Home({userInfo}) {

  const history = useHistory();

  const {socket, isInitialized} = useSocket();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [roomId, setRoomId] = useState('');

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
      <UserStatus/>
      <Button color={"primary"} variant={"outlined"} onClick={createBoard}>Create Board</Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>Join game</Button>
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
