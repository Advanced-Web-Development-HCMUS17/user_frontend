import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import {Grid, Typography, FormControl, InputLabel, Input, Box, Button} from '@material-ui/core';

import accountService from './service/account-service';

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

export default function Register({onSuccess}) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const register = async (event) => {
        event.preventDefault();
        const token = await accountService.register(userName, email, password);
        console.log("Register token received: ", token);
        if (token)
            onSuccess();
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography className={classes.title} variant="h4">
                        Register
                    </Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={(e) => register(e)}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <FormControl>
                                    <Box width={350}>
                                        <InputLabel htmlFor="input-username">User Name</InputLabel>
                                        <Input
                                            id="input-username"
                                            type="text"
                                            fullWidth
                                            value={userName}
                                            onInput={e => setUserName(String(e.target.value))}
                                        />
                                    </Box>
                                </FormControl>
                            </Grid>
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
                                <Button type="submit">Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item>
                    <Typography>
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}