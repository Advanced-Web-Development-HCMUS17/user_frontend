import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useSocket } from "../socketHook/useSocket";
import { LOBBY_EVENT, HOME_EVENT, REPLAY_EVENT } from "../socketHook/EventConstant";
import UserStatus from "../userStatus/UserStatus";
import {
  Container, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Grid, TextField, Typography, Link, Card, CardMedia, CardContent, CardActions, CssBaseline, Box
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

export default function History() {
  const classes = useStyles();
  const { socket, isInitialized } = useSocket();
  const [list, setList] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    if (socket) {
      socket.emit(REPLAY_EVENT.GET_LOBBIES, {});

      socket.on(REPLAY_EVENT.GET_LOBBIES, ({ lobbies }) => {
        console.log("Working!!");
        if (lobbies) {
          console.log("Rooms are ", lobbies);
          setList(lobbies);
        }
        else {

        }
      })

    }
  }, [isInitialized]);


  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            Played matches
              </Typography>

        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {list && list.map((value, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://image.winudf.com/v2/image1/Y29tLnBvcG9rby5nb21va3V2bl9pY29uXzE1NzU1NTYyNjVfMDI0/icon.png?w=170&fakeurl=1"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>

                  <Typography align="center">
                    <Box fontWeight={700} >
                      {value.user1 ? value.user1 : "      "}
                    </Box>
                  </Typography>
                  <Typography align="center">
                    vs
                  </Typography>
                  <Typography align="center">
                  <Box fontWeight={700} mb={2}>
                      {value.user2 ? value.user2 : "      "}
                    </Box>
                  </Typography>

                  <Typography >

                    Date: {value.date.slice(0, 10)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" href={"/replay/"+value.roomId}>
                    View
                      </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
