import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Person from "@material-ui/icons/PersonOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import {fetchLeaderboard} from "../../service/api";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import LinearProgress from "@material-ui/core/LinearProgress";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: yellow[600]
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Leaderboard(props) {

  const [leaderboard, setLeaderboard] = useState(null);

  async function fetchData() {
    const ldb = await fetchLeaderboard();
    setLeaderboard(ldb);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  return (<Grid item>
    <Box p={2}>
      <Paper className={classes.root}>
        <Box p={2} textAlign={"center"}><Typography variant={"h5"}>Leaderboard</Typography>
          {leaderboard ? <List dense>
            {leaderboard.map((player, index) => (
                <LeaderboardItem rating={player.rating} username={player.username} avatar={player.avatar}
                                 email={player.email} index={index}/>
              )
            )}
          </List> : <LinearProgress color="secondary"/>
          }
        </Box>
      </Paper>
    </Box>
  </Grid>);
}

function LeaderboardItem({username, email, rating, avatar, index}) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <ListItemText primary={<Box fontWeight={"bold"}>{`#${index + 1}`}</Box>}/>
      </ListItemAvatar>
      <ListItemAvatar>
        <Avatar
          alt={`Avatar n°${index + 1}`}
          src={avatar}
        >{username.toUpperCase()[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} secondary={email}/>
      <ListItemSecondaryAction><ListItemText primary={rating}/></ListItemSecondaryAction>
    </ListItem>
  )
}
