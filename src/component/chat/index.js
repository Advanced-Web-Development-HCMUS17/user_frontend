import React, {useEffect, useRef, useState} from "react";
import {useSocket} from "../socketHook/useSocket";
import {CHAT_EVENT} from "../socketHook/EventConstant";
import Message from "./Message";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {InputAdornment, List, Paper, TextField} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const useStyles = makeStyles(() => ({
  sendIcon: {
    color: "#3F51B5"
  },
  sendTextField: {
    "margin-top": "10px",
  }
}));

const ChatLayout = ({user}) => {
  const {socket, isInitialized} = useSocket();
  const [message, setMessage] = useState(``);
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (socket) {
      console.log("Ready to received message");
      socket.on(CHAT_EVENT.RECEIVE_MESSAGE, ({messageList}) => {
        setMessageList(messageList);
      });
    }
  }, [isInitialized]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behaviour: "smooth"});
    }
  }, [messageList]);

  const messageConversation = messageList.map((obj, i = 0) =>
    <Message messageObj={obj} currentUserID={user._id} elementKey={i++}/>
  );
  messageConversation.push(<div ref={scrollRef}/>);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit(CHAT_EVENT.SEND_MESSAGE, {message: message, time: (new Date()).getTime()});
      setMessage(``);
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
        <TextField
          className={classes.sendTextField}
          variant="outlined"
          value={message}
          fullWidth
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event => event.key === `Enter` ? sendMessage(event) : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendRoundedIcon className={classes.sendIcon}/>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ChatLayout;