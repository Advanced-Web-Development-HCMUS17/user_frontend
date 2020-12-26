import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, ListItem, Paper, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  messageRight: {
    "padding-block": "0",
    display: "flex",
    justifyContent: "flex-end",
  },
  messageLeft: {
    "padding-block": "0",
    display: "flex",
    justifyContent: "flex-start"
  },
  messageContentLeft: {
    backgroundColor: '#ededed',
  },
  messageContentRight: {
    color: '#ffffff',
    backgroundColor: '#0098ff',
  },
  timeRight: {
    "text-align": "right",
    "font-size": "x-small"
  },
  timeLeft:{
    "text-align": "left",
    "font-size": "x-small"
  }
}));

export default function Message({messageObj, currentUserID, elementKey}) {
  const classes = useStyles();
  const time = new Date(messageObj.time);
  const time_formatted = String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, "0");
  if (messageObj.user._id === currentUserID) {
    return (
      <ListItem key={elementKey} className={classes.messageRight}>
        <Box>
          <Box>
            <Paper className={classes.messageContentRight} elevation={0}>
              <Box p={0.5}>
                <Typography component="div">
                  <Box textAlign="center">
                    {messageObj.message}
                  </Box>
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Typography component="div">
              <Box className={classes.timeRight}>
                {time_formatted}
              </Box>
            </Typography>
          </Box>
        </Box>
      </ListItem>
    );
  } else {
    return (
      <ListItem key={elementKey} className={classes.messageLeft}>
        <Box>
          <Box>
            <Paper className={classes.messageContentLeft} elevation={0}>
              <Box m={0.5}>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold"
                       fontSize={13}
                  >
                    {messageObj.user.username}
                  </Box>
                  <Box>
                    {messageObj.message}
                  </Box>
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Typography component="div">
              <Box className={classes.timeLeft}>
                {time_formatted}
              </Box>
            </Typography>
          </Box>
        </Box>
      </ListItem>
    );
  }
}