import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {useParams} from "react-router";
import {useAuth} from "./useAuth";
import AccountServices from "../service/account-service";
import Typography from "@material-ui/core/Typography";
import {CSnackbars, TYPE} from "./userAuthentication/CSnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.ibb.co/pP5dHL3/tictactoe.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    transform: 'scaleX(-1)',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    paddingTop: "50px",
  },
}));

const API_URL = process.env.REACT_APP_API_URL;

export default function LoginPage() {
  const {token} = useParams();
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState(TYPE.INFO);
  const classes = useStyles();

  const autoLogin = async (token) => {
    if (token !== undefined) {
      setInProgress(true);
      const response = await AccountServices.loginByToken(token);
      setInProgress(false);
      if (response.error) {
        setType(TYPE.ERROR);
        setMessage(response.message);
        setOpen(true);
      } else
        login(response.token, response.userInfo);
    }
  }

  useEffect(() => {
    if (token !== undefined)
      autoLogin(token);
  }, [token]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setType(TYPE.WARNING);
      setMessage("Please enter email and password");
      return setOpen(true);
    }
    setInProgress(true);
    const response = await AccountServices.login(email, password);
    setInProgress(false);
    if (response)
      if (response.error) {
        setType(TYPE.ERROR);
        setMessage(response.message);
        setOpen(true);
      } else
        login(response.token, response.userInfo);
  }

  const handleGoogleLogin = () => {
    window.open(`${API_URL}/users/google`, "_self")
  }

  const handleFacebookLogin = () => {
    window.open(`${API_URL}/users/facebook`, "_self");
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid container direction="column" justify="center" item xs={12} sm={8} md={5} component={Paper} elevation={6}
              square>
          <Grid item>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={(e) => handleSubmitLogin(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onInput={e => setEmail(String(e.target.value))}
                  onClick={() => setEmail('')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onInput={e => setPassword(String(e.target.value))}
                  onClick={() => setPassword('')}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={inProgress}
                >
                  {inProgress ? <CircularProgress/> : "Sign in"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/reset-password/get-code" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <Divider variant="middle"/>
              <Typography className={classes.label}>
                Or sign up with
              </Typography>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <IconButton onClick={() => handleGoogleLogin()}>
                    <Avatar src="https://i.stack.imgur.com/22WR2.png"/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleFacebookLogin()}>
                    <Avatar src="https://image.flaticon.com/icons/png/512/174/174848.png"/>
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <CSnackbars open={open} handleClose={() => setOpen(false)} type={type} message={message}/>
    </>
  );
}