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
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import green from "@material-ui/core/colors/green";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: green["A200"]
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
  return (<Grid item>
    <Box p={2}>
      <Paper className={classes.root}>
        <Box p={2} textAlign={"center"} fontWeight={"bold"}><Typography variant={"h5"}>Online users</Typography>
          <List>
            {
              usersOnline.map(user => (
                <ListItem key={user._id}>
                  <ListItemIcon>
                    <Person/>
                  </ListItemIcon>
                  <ListItemText primary={user.user.username} secondary={user.user.email}/>
                </ListItem>))
            }
          </List></Box>
      </Paper>
    </Box>
  </Grid>);
}

