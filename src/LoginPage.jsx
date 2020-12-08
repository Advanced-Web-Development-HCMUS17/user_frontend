import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import {Grid, Typography, FormControl, InputLabel, Input, Box, Button} from '@material-ui/core';

import accountService from './service/account-service';
import tokenService from './service/token-service';

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

export default function Login({onSuccess}) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (event) => {
        event.preventDefault();
        const token = await accountService.login(email, password);
        if (token) {
            tokenService.setToken(token);
            console.log("[Login email-password] Nhan duoc Token: ", token);
            onSuccess();
        } else {
            console.log("[Login email-password] Khong nhan duoc token");
        }
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
                    <form onSubmit={(e) => login(e)}>
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
            </Grid>
        </div>
    );
}