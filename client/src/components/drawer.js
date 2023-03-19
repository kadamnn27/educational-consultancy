import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import MenuIcon from "@material-ui/icons/Menu";
import texturedImage from "../images/textured_3_edit.png";
import dropDownIcon from '../images/icons/icons8-drop-down-30.png';
import {
    Collapse, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    AppBar,
    Grid,
} from '@mui/material';
import { CssBaseline, makeStyles, Typography } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';

import crossIcon from '../images/icons/icons8-multiplication-48.png';

import { Link, navigate, useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from '../api/axios';
const LOGOUT_URL = '/api/v1/logout';

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "orange",
        fontSize: "20px",
        "&:focus,&:hover": {
            color: "orange"
        }
    },
    icon: {
        color: "white"
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    logoText: {
        color: "#fea905",
        fontSize: "20px",
        position: "relative",
        zIndex: 100,
        marginLeft: "20px",
        fontFamily: 'Revue',
        textDecoration: "none",
    },
    navbar: {
        background: `url(${texturedImage})`,
        position: "fixed",
    },
    paper: {
        background: `url(${texturedImage})`,
    },
    list: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
    },
    courseMenuLinks: {
        textDecoration: "none",
        color: "#fea905",
        fontSize: "17px",

    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DrawerMenu = () => {
    const [open, setOpen] = React.useState(false);
    //courses menu
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenUG, setMenuOpenUG] = useState(false);
    const [menuOpenPG, setMenuOpenPG] = useState(false);

    //mode menu
    const [modeMenuOpen, setModeMenuOpen] = useState(false);

    //account menu
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const { user, setUser, cookieToken, setCookieToken, course, setCourse, mode, setMode, accountPage, setAccountPage } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            <CssBaseline />
            <AppBar elevation={0} className={classes.navbar}>
                <Toolbar >
                    <Link to="/" className={classes.logoText}>
                        <Typography style={{ marginLeft: 0, fontSize: "20px", fontWeight: "700" }} className={classes.logoText}>Expert Educational</Typography>
                        <Typography style={{ marginLeft: 0, fontSize: "32px", fontWeight: "300" }} className={classes.logoText}>Consultancy</Typography>
                    </Link>
                    <Drawer
                        anchor="right"
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        classes={{ paper: classes.paper }}
                    >

                        <List>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link className={classes.link} to="/about">About Us</Link>
                                </ListItemText>
                            </ListItem>
                            {/* <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link className={classes.link} to="/colleges">Colleges</Link>
                                </ListItemText>
                            </ListItem> */}
                            <ListItem onClick={() => setModeMenuOpen(!modeMenuOpen)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingLeft: '11px'
                                }}
                            >
                                <button style={{ background: 'transparent', border: 'none', display: 'flex' }}>
                                    <Typography style={{ fontSize: '20px', color: '#fea905' }}>
                                        Mode
                                    </Typography>

                                    <img src={dropDownIcon} />
                                </button>
                                <Collapse in={modeMenuOpen} timeout={500} unmountOnExit
                                    style={{
                                        top: '65px',
                                        margin: '0px',
                                        padding: '0px',
                                        zIndex: '100'
                                    }}>
                                    <ul class="menu-list-drawer">
                                        <li style={{
                                            background: mode === 'UG' ? 'rgba(255,165,0,0.2)' : 'transparent',
                                            listStyleType: 'none',
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => {
                                                setMode('UG');
                                                setOpenDrawer(false);
                                            }}
                                        >
                                            Neet UG
                                        </li>
                                        <li style={{
                                            background: mode === 'PG' ? 'rgba(255,165,0,0.2)' : 'transparent',
                                            listStyleType: 'none',
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => {
                                                setMode('PG');
                                                setOpenDrawer(false);
                                            }}
                                        >
                                            Neet PG
                                        </li>
                                    </ul>
                                </Collapse>
                            </ListItem>
                            {/* <ListItem style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                paddingLeft: '11px'
                            }}>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    style={{ background: 'transparent', border: 'none', display: 'flex'}}>
                                    <Typography style={{ fontSize: '20px', color: '#fea905' }}>
                                        Courses
                                    </Typography>
                                    <img src={dropDownIcon}></img>
                                </button>
                                <Collapse in={menuOpen} timeout={500} unmountOnExit
                                    style={{
                                        top: '65px',
                                        margin: '0px',
                                        padding: '0px',
                                        zIndex: '100'
                                    }}
                                >
                                    <ul class="menu-list-drawer">
                                        <li style={{ listStyleType: 'none' }}
                                            onClick={() => setMenuOpenUG(!menuOpenUG)}
                                        >
                                            Neet UG
                                            <img
                                                src={dropDownIcon}
                                            />
                                            <Collapse in={menuOpenUG}
                                                style={{
                                                    top: '0px',
                                                    zIndex: '101'
                                                }}
                                                timeout={500} unmountOnExit
                                            >
                                                <ul class="menu-list-drawer">
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("UG1")}>
                                                            UG1
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("UG2")}>
                                                            UG2
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("UG3")}>
                                                            UG3
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("UG4")}>
                                                            UG4
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </Collapse>
                                        </li>
                                        <li style={{ listStyleType: 'none' }}
                                            onClick={() => setMenuOpenPG(!menuOpenPG)}
                                        >
                                            Neet PG
                                            <img
                                                src={dropDownIcon}
                                            />
                                            <Collapse in={menuOpenPG}
                                                style={{
                                                    top: '0px',
                                                    zIndex: '101'
                                                }}
                                                timeout={500} unmountOnExit
                                            >
                                                <ul class="menu-list-drawer">
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("PG1")}>
                                                            PG1
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("PG2")}>
                                                            PG2
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("PG3")}>
                                                            PG3
                                                        </Link>
                                                    </li>
                                                    <li style={{ listStyleType: 'none', padding: '10px' }}>
                                                        <Link to='/course' class={classes.courseMenuLinks} onClick={() => setCourse("PG4")}>
                                                            PG4
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </Collapse>
                                        </li>
                                    </ul>
                                </Collapse>
                            </ListItem> */}
                            {!user ?
                                <>
                                    <ListItem onClick={() => setOpenDrawer(false)}>
                                        <ListItemText>
                                            <Link className={classes.link} to="/register">Register</Link>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem onClick={() => setOpenDrawer(false)}>
                                        <ListItemText>
                                            <Link className={classes.link} to="/login">Login</Link>
                                        </ListItemText>
                                    </ListItem>
                                </> :
                                <>
                                    <ListItem onClick={() => setAccountMenuOpen(accountMenuOpen => !accountMenuOpen)}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Typography style={{ color: 'orange', fontSize: '20px' }}>
                                            Account Details
                                            <img src={dropDownIcon} />
                                        </Typography>
                                        <Collapse in={accountMenuOpen} timeout={500} unmountOnExit
                                            style={{
                                                top: '65px',
                                                margin: '0px',
                                                padding: '0px',
                                                zIndex: '100'
                                            }}>
                                            <ul class="menu-list-drawer">
                                                <li style={{
                                                    background: accountPage === 'Profile' ? 'rgba(255,165,0,0.2)' : 'transparent',
                                                    listStyleType: 'none',
                                                    padding: '10px',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => {
                                                        setAccountPage('Profile');
                                                        navigate('/account');
                                                        setOpenDrawer(false);
                                                    }}
                                                >
                                                    Profile
                                                </li>
                                                <li style={{
                                                    background: accountPage === 'Colleges' ? 'rgba(255,165,0,0.2)' : 'transparent',
                                                    listStyleType: 'none',
                                                    padding: '10px',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => {
                                                        setAccountPage('Colleges');
                                                        navigate('/account');
                                                        setOpenDrawer(false);
                                                    }}
                                                >
                                                    Colleges
                                                </li>
                                                <li style={{
                                                    background: accountPage === 'Membership Settings' ? 'rgba(255,165,0,0.2)' : 'transparent',
                                                    listStyleType: 'none',
                                                    padding: '10px',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => {
                                                        setAccountPage('Membership Settings');
                                                        navigate('/account');
                                                        setOpenDrawer(false);
                                                    }}
                                                >
                                                    Membership Settings
                                                </li>
                                            </ul>
                                        </Collapse>
                                    </ListItem>
                                    <ListItem onClick={() => {
                                        setOpenDrawer(false);
                                        try {
                                            axios.get(LOGOUT_URL, {
                                                headers: {
                                                    Authorization: `Bearer ${cookieToken}`
                                                }
                                            })
                                                .then((res) => {
                                                    setUser(null);
                                                    setCookieToken(null);
                                                    Cookies.remove('token');
                                                    localStorage.removeItem('user');
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });

                                        }
                                        catch (error) {
                                            console.log(error)
                                        }
                                    }}>
                                        <ListItemText>
                                            <Link className={classes.link} to="/">Logout</Link>
                                        </ListItemText>
                                    </ListItem>
                                </>
                            }
                        </List>
                    </Drawer>
                    <Grid item>
                        <IconButton style={{ position: "absolute", right: 5, top: 10, color: "orange" }} onClick={() => setOpenDrawer(!openDrawer)}>
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div >
    );
}
export default DrawerMenu;