import React from 'react';
import {useUserStatus} from "./useUserStatus";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Person from "@material-ui/icons/PersonOutlined";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function UserStatus({props}) {
  const usersOnline = useUserStatus();

  const classes = useStyles();
  return (<Grid className={classes.root}>
    <List>
      {
        usersOnline.map(user => (
          <ListItem key={user.id}>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText primary={user.id} secondary={user.user}/>
          </ListItem>))
      }
    </List>
  </Grid>);
}

