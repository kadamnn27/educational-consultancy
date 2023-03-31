import React, { useEffect, useState, useContext } from 'react';

import { Grow, Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { Alert, Button, Stack, CircularProgress, TextField } from '@mui/material';
import texturedImage from "../images/textured_3_edit.png";

import { Link } from "react-router-dom";

import { UserContext } from "../UserContext"
import Cookies from 'js-cookie';

import axios from '../api/axios';

const LOGIN_URL = '/api/v1/login';

const useStyles = makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: '40px',
    }
}));

const Login = ({ navbar, setNavbar }) => {
    const classes = useStyles();

    useEffect(() => {
        setNavbar(true);
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [failiure, setFailiure] = useState(false);
    const [failiureMessage, setFailiureMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [responseRecieved, setResponseRecieved] = useState(false);

    const { user, setUser, cookieToken, setCookieToken } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseRecieved(true);
        setSuccess(false);
        setFailiure(false);
        if (!email || !password) {
            setResponseRecieved(false);
            return alert("One or more fields missing");
        }
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            setResponseRecieved(false);
            setSuccess(true);
            setUser(response.data.user);
            Cookies.set('token', response.data.token, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
            setCookieToken(Cookies.get('token'));
        } catch (error) {
            console.log(error);
            console.log(error.response.data.msg);
            setFailiureMessage(error.response.data.msg);
            setFailiure(true);
            setResponseRecieved(false);
        }
    }

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            style={{ margin: '100px 25px' }}
        >
            {failiure ? (
                <Grow in timeout={500}>
                    <Stack sx={{ width: '100%' }}>
                        <Alert
                            severity="error"
                            action={
                                <Button color="inherit" size="small">
                                    <Link style={{ textDecoration: "none", color: "red" }} to="/">Home</Link>
                                </Button>
                            }
                        >
                            {failiureMessage}
                        </Alert>
                    </Stack>
                </Grow>
            ) : (<></>)
            }
            {success ? (
                <Grow in timeout={500}>
                    <Stack sx={{ width: '100%' }}>
                        <Alert
                            action={
                                <Button color="inherit" size="small">
                                    <Link style={{ textDecoration: "none", color: "limegreen" }} to="/">Home</Link>
                                </Button>
                            }
                        >
                            Login Successful. Click on the button to go back to home page
                        </Alert>
                    </Stack>
                </Grow>
            ) : (<></>)
            }
            <Paper elevation={5} style={{ borderRadius: '20px', margin: 'auto', maxWidth: '400px', paddingBottom: '20px' }}>
                <Typography style={{
                    padding: '20px',
                    borderRadius: "20px 20px 0px 0px",
                    background: '#1769aa',
                    color: 'white',
                    fontFamily: "Nunito Sans",
                    fontWeight: "800",
                }} variant="h3" align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin: '5px' }} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ margin: '5px', marginBottom: '20px' }} id="outlined-basic" label="Password" variant="outlined" />
                    {responseRecieved ?
                        <Button color="primary" style={{ margin: '5px', borerRadius: '10px' }} variant="contained"><CircularProgress style={{ color: "white" }} /></Button>
                        :
                        <Button type="submit" color="primary" style={{ margin: '5px', borderRadius: '20px' }} variant="contained">Sign IN</Button>
                    }
                </form>
                <Typography style={{ fontFamily: "Nunito Sans", fontWeight: '600' }} align="center">Don't have an account ? <Link to="/register" style={{ color: '#1769AA', fontWeight: '800', textDecoration: 'none' }}>Sign Up</Link> </Typography>
            </Paper>
        </Box>
    )
}

export default Login;