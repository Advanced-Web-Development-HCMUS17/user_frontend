import React, {useEffect, useState} from "react";
import NavigationBar from "./NavigationBar";
import {Avatar, CircularProgress, Divider, Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import {CloudUploadOutlined} from "@material-ui/icons";
import {CSnackbars, TYPE} from "./userAuthentication/CSnackBar";
import {useAuth} from "./useAuth";
import AccountServices from "../service/account-service";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingInline: "50px",
    paddingBlock: "25px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: "#2684FC",
  },
  label: {
    color: "#3f51b5",
    fontWeight: "bolder",
  },
  button: {
    color: "#3f51b5",
  },
  verified: {
    color: "#269E61",
    fontWeight: "bolder",
  },
  notVerified: {
    color: "#F0B638",
    fontWeight: "bolder",
  }
}));

export default function ProfilePage(user) {
  const classes = useStyle();
  const {token, userInfo, setUserInfo} = useAuth();
  const [totalMatch, setTotalMath] = useState(null);
  const [winRate, setWinRate] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(TYPE.INFO);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImgUpload = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const res = await AccountServices.updateAvatar(token, e.target.files[0]);
    setIsProcessing(false);
    if (res.error) {
      setMessage(res.message);
      setType(TYPE.ERROR);
      setOpen(true);
    } else
      setUserInfo(res.data);
  }

  const fetchData = async (token) => {
    const games = await AccountServices.getBoardList(token);
    if (games.error) {

    } else {
      const total = games.length;
      const win = games.filter(game => game.winner === userInfo.username).length;
      setTotalMath(total);
      setWinRate(Math.round(win / total * 10000) / 100);
    }
  }

  useEffect(() => {
    fetchData(token);
  }, [])

  return (
    <>
      <NavigationBar/>
      <Grid container direction="column" className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6"> User profile</Typography>
        </Grid>
        <Divider/>
        <Grid container direction="row" item xs={12}>
          <Grid container direction="column" item xs={8} spacing={2}>
            <Grid container item direction="row" spacing={2}>
              <Grid container item xs={3} justify="flex-end">
                <Grid item className={classes.label}>Email</Grid>
              </Grid>
              <Grid item>{user.email}</Grid>
              {user.isVerified ?
                <Grid item className={classes.verified}>(Verified)</Grid> :
                <Grid item className={classes.notVerified}>(Not verified)</Grid>
              }
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container justify="flex-end" item xs={3}>
                <Grid item className={classes.label}>User name</Grid>
              </Grid>
              <Grid item xs={9}>{user.username}</Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container justify="flex-end" item xs={3}>
                <Grid item className={classes.label}>Level</Grid>
              </Grid>
              <Grid item xs={9}>{user.rating}</Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container justify="flex-end" item xs={3}>
                <Grid item className={classes.label}>Joined</Grid>
              </Grid>
              <Grid item xs={9}>{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container justify="flex-end" item xs={3}>
                <Grid item className={classes.label}>Total matchs</Grid>
              </Grid>
              <Grid item xs={9}>{totalMatch}</Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid container justify="flex-end" item xs={3}>
                <Grid item className={classes.label}>Win rate</Grid>
              </Grid>
              <Grid item xs={9}>{totalMatch === 0 ? 0 : winRate}%</Grid>
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" item xs={4}>
            <Grid item>
              <Avatar src={user.avatar ? user.avatar : null} className={classes.avatar}>
                {String(user.username).split(' ')[0]}
              </Avatar>
            </Grid>
            <Grid item>
              <form>
                <input id="file-input" type="file" accept="image/jpeg,image/png" hidden onChange={handleImgUpload}/>
                <label htmlFor="file-input">
                  <IconButton component="span" className={classes.button} disabled={isProcessing}>
                    {isProcessing ? <CircularProgress/> : <CloudUploadOutlined/>}
                  </IconButton>
                </label>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CSnackbars open={open} handleClose={() => setOpen(false)} type={type} message={message}/>
    </>
  );
}