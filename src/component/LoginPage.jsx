import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {Box, Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography} from '@material-ui/core';

import {useAuth} from "./useAuth";
import AccountServices from "../service/account-service";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
  },
  title: {
    color: '#283593',
    fontWeight: "bold"
  }
}));

export default function Login({props}) {
  const {search} = useLocation();
  const {token} = queryString.parse(search);
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (token !== undefined) {
      login(token);
    }
  }, [token]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const response = await AccountServices.login(email, password);
    if (response) {
      login(response.token, response.userInfo);
    }
  }

  const handleGoogleLogin = () => {
    window.open(`${API_URL}/users/google`, "_self")
  }

  const handleFacebookLogin = () => {
    window.open(`${API_URL}/users/facebook`, "_self");
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography className={classes.title} variant="h4">
            Login
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={(e) => handleSubmitLogin(e)}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <FormControl>
                  <Box width={350}>
                    <InputLabel htmlFor="input-email">Email</InputLabel>
                    <Input
                      id="input-email"
                      type="text"
                      fullWidth
                      value={email}
                      onInput={e => setEmail(String(e.target.value))}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Box width={350}>
                    <InputLabel htmlFor="input-password">Password</InputLabel>
                    <Input
                      id="input-password"
                      type="password"
                      fullWidth
                      value={password}
                      onInput={e => setPassword(String(e.target.value))}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <Button type="submit">Login</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Typography>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => {
            handleGoogleLogin();
          }}>
            Sign in with Google
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => handleFacebookLogin()}>
            Sign in with Facebook
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
