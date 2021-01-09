import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router";
import {Link} from 'react-router-dom';
import accountService from "../service/account-service";
import {CircularProgress} from "@material-ui/core";
import Template1 from "./resetPassword/Template1";
import validator from "../service/data-validator";
import {CSnackbars, TYPE} from "./userAuthentication/CSnackBar";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Warning');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const register = async (event) => {
    event.preventDefault();
    if (email.length === 0 || !validator.email(email)) {
      setTitle(TYPE.WARNING);
      setMessage("Please enter valid email");
      setRedirect(false);
      return setOpen(true);
    }
    if (!validator.password(password)) {
      setTitle(TYPE.WARNING);
      setMessage("Password must have at least 8 characters includes: 1 letter, 1 number and 1 special character");
      setRedirect(false);
      return setOpen(true);
    }
    setInProgress(true);
    const response = await accountService.register(userName, email, password);
    setInProgress(false);
    if (response) {
      if (response.error) {
        setTitle(TYPE.ERROR);
        setMessage(response.message);
        setRedirect(false);
        setOpen(true);
      } else {
        setTitle(TYPE.SUCCESS);
        setMessage("An verify email has sent to: " + email);
        setRedirect(true);
        setOpen(true);
      }
    }
  }

  const childComponent = (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              autoFocus
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onInput={e => setEmail(String(e.target.value))}
              onClick={() => setEmail('')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="Your Name"
              value={userName}
              onInput={e => setUserName(String(e.target.value))}
              onClick={() => setUserName('')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={inProgress}
          onClick={(e) => register(e)}
        >
          {inProgress ? <CircularProgress/> : "Sign Up"}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <div>
      <Template1 childComponent={childComponent}/>
      <CSnackbars open={open} type={title} message={message} duration={redirect ? 3000 : 5000} handleClose={() => {
        setOpen(false);
        redirect && history.push("/login");
      }}/>
    </div>
  );
}