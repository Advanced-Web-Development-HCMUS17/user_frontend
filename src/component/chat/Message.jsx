import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, ListItem, Paper, Typography} from "@material-ui/core";


const useStyles = makeStyles(() => ({
  messageRight: {
    "padding-block": "3px",
    display: "flex",
    justifyContent: "flex-end",
  },
  messageLeft: {
    "padding-block": "3px",
    display: "flex",
    justifyContent: "flex-start"
  },
  messageContentLeft: {
    backgroundColor: '#ededed',
  },
  messageContentRight: {
    color: '#ffffff',
    backgroundColor: '#0098ff'
  }
}));

export default function Message({messageObj, currentUserID, elementKey}) {
  const classes = useStyles();
  const time = new Date(messageObj.time);
  const time_formatted = String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, "0");
  if (messageObj.user._id === currentUserID) {
    return (
      <ListItem key={elementKey} className={classes.messageRight}>
        <Paper className={classes.messageContentRight} elevation={0}>
          <Box m={0.5}>
            <Typography component="div">
              <Box >
                {messageObj.message} • {time_formatted}
              </Box>
            </Typography>
          </Box>
        </Paper>
      </ListItem>
    );
  } else {
    return (
      <ListItem key={elementKey} className={classes.messageLeft}>
        <Paper className={classes.messageContentLeft} elevation={0}>
          <Box m={0.5}>
            <Typography component="div">
              <Box fontWeight="fontWeightLight"
                   fontSize={13}>
                {messageObj.user.username}
              </Box>
              <Box>
                {messageObj.message} • {time_formatted}
              </Box>
            </Typography>
          </Box>
        </Paper>
      </ListItem>
    );
  }
}