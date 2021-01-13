import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSocket } from "../socketHook/useSocket";
import { LOBBY_EVENT, HOME_EVENT, REPLAY_EVENT } from "../socketHook/EventConstant";
import { ReplayContext } from './useReplay';
import PlayerInfo from "../lobby/PlayerInfo";
import Game from './Game';

import {Container, Paper, Grid, TextField, Typography, Link, Card,
  CardMedia, CardContent, CardActions, CssBaseline, Button, Box
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Replay() {
  const classes = useStyles();

  const { gameData, setGameData } = useContext(ReplayContext);

  //TODO: same with game info in admin subsystem

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item md={12}>
        <Grid container direction='row' spacing={1}>
        <Grid item md={3}>
            <Grid container direction='row' spacing={2}>
              <Grid item md={12}>
                <Paper className={classes.title} elevation={1} square>
                  <Box p={0.5}>LOBBY</Box>
                </Paper>
              </Grid>
              <Grid item md={12}>

                <Grid container direction='row' spacing={1}>
                  <Grid item md={12}>
                    <Paper variant={"elevation"}>
                      <Typography variant={"h6"}>Player 1</Typography>

                      <PlayerInfo name={gameData.player1.username}
                        email={gameData.player1.email}
                        rating={gameData.player1.rating} />

                    </Paper>
                  </Grid>
                  <Grid item md={12}>
                    <Paper>
                      <Typography variant={"h6"}>Player 2</Typography>

                      <PlayerInfo name={gameData.player2.username}
                        email={gameData.player2.email}
                        rating={gameData.player2.rating} />

                    </Paper>
                  </Grid>
                </Grid>


              </Grid>
            </Grid>
          </Grid>
          <Grid item md={9}>
            <Grid container direction='column' spacing={1}>
              <Grid item md={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={10}>
                    <Paper className={classes.title} elevation={1} square>
                      <Box p={0.5}>GAME</Box>
                    </Paper>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item md={12}>
                <Game/>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item md={2}>
            <Grid container direction='row' spacing={2}>
              <Grid item md={12}>
                <Paper className={classes.title} elevation={1} square>
                  <Box p={0.5}>CHAT</Box>
                </Paper>
              </Grid>
              <Grid item md={12}>
                <ChatLayout user={userInfo} />
              </Grid>
            </Grid>
          </Grid> */}

        </Grid>
      </Grid>
    </Grid>
  );
}
