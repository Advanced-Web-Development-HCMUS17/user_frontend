import React, {useEffect, useState} from 'react';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Person from "@material-ui/icons/PersonOutlined";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import green from "@material-ui/core/colors/green";
import {useSocket} from "../socketHook/useSocket";
import LinearProgress from "@material-ui/core/LinearProgress";
import pink from "@material-ui/core/colors/pink";
import {LOBBY_EVENT} from "../socketHook/EventConstant";
import NavLink from "react-router-dom/NavLink";
import {SportsEsports} from "@material-ui/icons";
import {useHistory} from "react-router";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: pink[200],
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function LobbyList({props}) {


  const {socket, isInitialized} = useSocket();

  const [lobbies, setLobbies] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on(LOBBY_EVENT.LIST_LOBBY, (lobbies) => {
          let tempLobby = [];
          for (let key in lobbies) {
            tempLobby.push({...lobbies[key], lobbyId: key});
          }
          setLobbies(tempLobby);
        }
      );
    }
  }, [isInitialized]);

  const classes = useStyles();
  return (<Grid item>
    <Box p={2} textColor={"secondary"}>
      <Paper className={classes.root}>
        <Box p={2}><Box textAlign={"center"} fontWeight={"bold"}><Typography variant={"h5"}>Available
          lobbies</Typography></Box>
          {lobbies ? <List>
            {
              lobbies.map((lobby) => (
                <LobbyItem lobby={lobby}/>))
            }
          </List> : <LinearProgress color={"primary"}/>}
        </Box>
      </Paper>
    </Box>
  </Grid>);
}

function LobbyItem({lobby}) {

  const history = useHistory();

  const handleJoin = () => {
    history.push(`/l/${lobby.lobbyId}`);
  }
  return (
    <ListItem key={lobby.id}>
      <ListItemIcon>
        <SportsEsports/>
      </ListItemIcon>
      <ListItemText primary={<Versus player1={lobby.player1 ? lobby.player1.username : "Waiting"}
                                     player2={lobby.player2 ? lobby.player2.username : "Waiting"}/>}/>
      <ListItemSecondaryAction>
        <Button disabled={lobby.player1 && lobby.player2}  variant={"contained"} color={"primary"} onClick={handleJoin}>JOIN</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function Versus({player1, player2}) {
  return (
    <Grid container alignItems={"stretch"}>
      <Grid md={4}>
        {player1}
      </Grid>
      <Grid md={2}>
        -
      </Grid>
      <Grid md={4}>
        {player2}
      </Grid>
    </Grid>
  )
}
