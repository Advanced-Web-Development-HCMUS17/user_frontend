import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useSocket } from "../socketHook/useSocket";
import { LOBBY_EVENT,HOME_EVENT,REPLAY_EVENT } from "../socketHook/EventConstant";
import UserStatus from "../userStatus/UserStatus";
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Grid, TextField,Typography,Link,Card,CardMedia,CardContent,CardActions,CssBaseline } from "@material-ui/core";


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
    const {socket,isInitialized} = useSocket();
    const [list,setList] = useState([]);

    useEffect(() => {
      if (socket) {
        
        
      }
    }, [isInitialized]);


    return (
        <React.Fragment>
          
        </React.Fragment>
    );
  }