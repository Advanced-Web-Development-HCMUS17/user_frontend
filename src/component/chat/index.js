import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSocket} from "../socketHook/useSocket";
import {CHAT_EVENT} from "../socketHook/EventConstant";
import {useParams} from "react-router";
import {Box, List, ListItem, Paper} from "@material-ui/core";


const useStyles = makeStyles(() => ({
  messageRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  messageLeft: {
    display: "flex",
    justifyContent: "flex-start"
  },
  messageContentLeft: {
    margin: "10px",
    backgroundColor: '#ededed'
  },
  messageContentRight: {
    margin: "10px",
    color:'#ffffff',
    backgroundColor: '#0098ff'
  }
}));

const ChatLayout = ({username}) => {
  const {socket, isInitialized} = useSocket();
  const {lobbyId} = useParams();
  const [message, setMessage] = useState(``);
  const [messageList, setMessageList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (socket) {
      console.log("Ready to received message");
      socket.on(CHAT_EVENT.RECEIVE_MESSAGE, (message) => {
        setMessageList(messageList => [...messageList, message]);
      });
    }
  }, [isInitialized]);

  const messageConversation = messageList.map((obj, i = 0) => (
    <ListItem key={i++} className={obj.username === username ? classes.messageRight : classes.messageLeft}>
      <Paper className={obj.username === username ? classes.messageContentRight : classes.messageContentLeft} elevation={0}>
        <Box m={0.5}>
          {obj.message}
        </Box>
      </Paper>
    </ListItem>
  ));

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit(CHAT_EVENT.SEND_MESSAGE, {message: message, roomId: lobbyId}, () => setMessage(``));
    }
  }

  return (
    <div>
      <Paper style={{maxHeight: 200, overflow: 'auto'}}>
        <List>
          {messageConversation}
        </List>
      </Paper>
      <div>
        <input value={message}
               onChange={event => setMessage(event.target.value)}
               onKeyPress={event => event.key === `Enter` ? sendMessage(event) : null}
        />
      </div>
    </div>
  );
};

export default ChatLayout;