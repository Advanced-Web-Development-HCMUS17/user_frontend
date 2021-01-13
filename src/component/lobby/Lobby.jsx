import React, {useEffect, useState} from "react";
import {useSocket} from "../socketHook/useSocket";
import {useParams} from "react-router";
import {LOBBY_EVENT, PLAYER_1, GAME_EVENT} from "../socketHook/EventConstant";
import {Button, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PlayerInfo from "./PlayerInfo";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Game from "../game/Game";
import ChatLayout from "../chat";
import { useAuth } from '../useAuth';
import NavigationBar from "../NavigationBar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    backgroundColor: `#3F51B5`,
    color: `#ffffff`,
  },
  rootContainer:{
    paddingInline: "25px",
  }
}));

export default function Lobby() {
  const {socket, isInitialized} = useSocket();
  const {lobbyId} = useParams();
  const classes = useStyles();
  const {userInfo} = useAuth();
  const [lobbyInfo, setLobbyInfo] = useState({});

  const [inviteUser, setInviteUser] = useState('');

  useEffect(() => {
    if (socket) {
      socket.emit(LOBBY_EVENT.JOIN_LOBBY, {roomId: lobbyId});
      socket.on(LOBBY_EVENT.LOBBY_INFO, (lobbyInfo) => {
        setLobbyInfo(lobbyInfo);
      });

      socket.on(LOBBY_EVENT.JOIN_LOBBY, ({user, player}) => {
        if (player === PLAYER_1) {
          setLobbyInfo({...lobbyInfo, player1: user});
        } else {
          setLobbyInfo({...lobbyInfo, player2: user});
        }
      });

      socket.on(LOBBY_EVENT.LEAVE_LOBBY, ({leftPlayer}) => {
        if (leftPlayer === PLAYER_1) {
          setLobbyInfo({...lobbyInfo, player1: null});
        } else {
          setLobbyInfo({...lobbyInfo, player2: null});
        }
      });

    }
    return () => {
      if (socket) {
        socket.emit(LOBBY_EVENT.LEAVE_LOBBY);
      }
    }
  }, [isInitialized]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = () => {
    socket.emit(LOBBY_EVENT.INVITE, {email: inviteUser});
    handleClose();
  }

  const copyBoardID = () => {
    navigator.clipboard.writeText(`gameBoard_${lobbyInfo.id}`);
    alert('Room ID copied to clipboard successfully');
  }
  function handleReady() {
    if (socket) {

      socket.emit(GAME_EVENT.GAME_READY, ({}));
    }
  }

  return (
    <>
    <NavigationBar/>
    <Grid container direction='column' spacing={1} className={classes.rootContainer}>
      <Grid item md={12}>
        <Grid container direction='row' spacing={1}>
          <Grid item md={9}>
            <Grid container direction='column' spacing={1}>
              <Grid item md={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item>
                    <Grid container direction='row' justify='center' alignItems={'center'}>
                      <Grid item>
                        <Box mx={2} my={1} component={"span"}>
                          <Button onClick={copyBoardID} variant='contained'
                                  style={{backgroundColor: `#009938`, color: `#ffffff`}}>
                            Share
                          </Button></Box>
                        <Box mx={2} my={1} component={"span"}><Button variant="contained" color="primary"
                                                                      onClick={() => handleReady()}>
                          Ready
                        </Button></Box>
                        <Box mx={2} my={1} component={"span"}><Button variant="contained" color="secondary"
                                                                      onClick={() => handleClickOpen()}>
                          Invite
                        </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Game/>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <Grid container direction='row' spacing={2}>
              <Grid item md={12}>
                {lobbyInfo ?
                  <Grid container direction='row' spacing={1}>
                    <Grid item md={12}>
                      <Paper variant={"elevation"}>
                        <Typography variant={"h6"}>Player 1</Typography>
                        {lobbyInfo.player1 ?
                          <PlayerInfo name={lobbyInfo.player1.username}
                                      email={lobbyInfo.player1.email}
                                      rating={lobbyInfo.player1.rating}/>
                          :
                          <div className={classes.root}>
                            <LinearProgress color="secondary"/>
                            <Typography variant={"inherit"}>Waiting for other player...</Typography>
                          </div>}
                      </Paper>
                    </Grid>
                    <Grid item md={12}>
                      <Paper>
                        <Typography variant={"h6"}>Player 2</Typography>
                        {lobbyInfo.player2 ?
                          <PlayerInfo name={lobbyInfo.player2.username}
                                      email={lobbyInfo.player2.email}
                                      rating={lobbyInfo.player2.rating}/>
                          :
                          <div className={classes.root}>
                            <LinearProgress color="secondary"/>
                            <Typography variant={"inherit"}>Waiting for other player...</Typography>
                          </div>
                        }
                      </Paper>
                    </Grid>
                  </Grid>
                  :
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Box p={0.5}>Invalid lobby</Box>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
            <Grid>
              <Grid container direction='row' spacing={2}>
                <Grid item md={12}>
                  <Paper className={classes.title} elevation={1} square>
                    <Box p={0.5}>CHAT</Box>
                  </Paper>
                </Grid>
                <Grid item md={12}>
                  <ChatLayout user={userInfo}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite a loser to join your game
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={inviteUser}
            onChange={event => setInviteUser(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInvite} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </>
  )
}