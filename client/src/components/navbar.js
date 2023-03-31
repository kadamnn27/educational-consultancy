import React, { useState, useEffect, useRef, useContext } from 'react';
import Collapse from '@mui/material/Collapse';
import { Toolbar, Typography, AppBar, CssBaseline, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

import DrawerMenu from "./drawer";
import "../App.css";
import dropDownIcon from '../images/icons/icons8-drop-down-30.png';
import texturedImage from "../images/textured_3_edit.png";

import Cookies from 'js-cookie';
import axios from '../api/axios';
const LOGOUT_URL = '/api/v1/logout';

const useStyles = makeStyles((theme) => ({
    navlinks: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "#fea905",
        fontSize: "20px",
        "&:hover": {
            color: "darkorange",
            borderBottom: "1px solid orange",
        },
    },
    courseMenuLinks: {
        textDecoration: "none",
        color: "#fea905",
        fontSize: "17px",
        "&:hover": {
            color: "black",
            borderBottom: "1px solid black",
        },
    },
    logoText: {
        color: "#fea905",
        fontSize: "20px",
        position: "relative",
        zIndex: 100,
        marginLeft: "20px",
        fontFamily: 'Revue'
    },
    navbar: {
        background: "transparent",
        position: "relative",
        top: "180px",
    },
    active: {
        background: `url(${texturedImage})`,
        position: "fixed",
        top: 0,
    }
}));

const Navbar = ({ navbar, setNavbar }) => {

    //courses menu
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenUG, setMenuOpenUG] = useState(false);
    const [menuOpenPG, setMenuOpenPG] = useState(false);

    //mode menu
    const [modeMenuOpen, setModeMenuOpen] = useState(false);

    // const [navbar, setNavbar] = useState(false);
    const [location, setLocation] = useState("/");
    const changeNavbar = () => {
        if (window.scrollY > 250 || window.location.pathname !== '/') {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeNavbar);
    const changeNavbarAlt = () => {
        if (window.location.pathname === location) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }
    const classes = useStyles();
    const theme = useTheme();
    const focus = useRef();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const { user, setUser, cookieToken, setCookieToken, course, setCourse, mode, setMode } = useContext(UserContext);
    return (
        <div>
            <CssBaseline />
            <div ref={focus}></div>
            {isMobile ? (<DrawerMenu />) :
                (<>
                    {window.location.pathname === "/" && !navbar? (<>
                        <Typography style={{ marginTop: "10px", fontSize: "25px" }} className={classes.logoText}>Expert Educational</Typography>
                        <Typography style={{ fontSize: "40px" }} className={classes.logoText}>Consultancy</Typography>
                    </>) : (<></>)
                    }
                    <AppBar id="navbar" elevation={0} className={navbar ? `${classes.navbar} ${classes.active}` : `${classes.navbar}`} >
                        <Toolbar>
                            <div className={classes.navlinks}>
                                <Link to="/" onClick={() => { focus.current.scrollIntoView({ behavior: 'smooth' }); setLocation("/"); changeNavbarAlt(); }} className={classes.link}>
                                    {navbar ? (<div onClick={() => focus.current.scrollIntoView({ behavior: 'smooth' })}><Typography style={{ marginLeft: 0, fontSize: "15px", fontWeight: "700" }} className={classes.logoText}>Expert Educational</Typography>
                                        <Typography style={{ marginLeft: 0, fontSize: "23px", fontWeight: "300" }} className={classes.logoText}>Consultancy</Typography></div>) : (<p style={{ position: "relative", top: "2px", marginBottom: "4px" }}>Home</p>)}
                                </Link>
                                <Link to="/about" className={classes.link}>
                                    About Us
                                </Link>
                                {/* <Link to={`/about/${mode}`} className={classes.link}>
                                    About {mode}
                                </Link> */}
                                {/* <button
                                    onMouseOver={() => setMenuOpen(true)}
                                    onMouseLeave={() => setMenuOpen(false)}
                                    style={{ background: 'transparent', border: 'none', display: 'flex' }}>
                                    <Typography style={{ fontSize: '20px', color: '#fea905' }}>
                                        Courses
                                    </Typography>
                                    <img src={dropDownIcon}></img>
                                </button>
                                <Collapse in={menuOpen} timeout={500} unmountOnExit
                                    onMouseOver={() => setMenuOpen(true)}
                                    onMouseLeave={() => setMenuOpen(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '65px',
                                        left: `5${((window.innerWidth) / 100) - 5}%`,
                                        zIndex: '100'
                                    }}
                                >
                                    <ul class="menu-list">
                                        <li style={{ listStyleType: 'none', padding: '10px' }}
                                            onMouseOver={() => setMenuOpenUG(true)}
                                            onMouseLeave={() => setMenuOpenUG(false)}
                                        >
                                            Neet UG
                                            <img
                                                style={{ transform: 'rotate(270deg)' }}
                                                src={dropDownIcon}
                                            />
                                            <Collapse in={menuOpenUG} orientation="horizontal"
                                                style={{
                                                    position: 'absolute',
                                                    left: '145px',
                                                    top: '0px',
                                                    zIndex: '101'
                                                }}
                                                timeout={500} unmountOnExit
                                            >
                                                <ul class="menu-list">
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
                                        <li style={{ listStyleType: 'none', padding: '10px' }}
                                            onMouseOver={() => setMenuOpenPG(true)}
                                            onMouseLeave={() => setMenuOpenPG(false)}
                                        >
                                            Neet PG
                                            <img
                                                style={{ transform: 'rotate(270deg)' }}
                                                src={dropDownIcon}
                                            />
                                            <Collapse in={menuOpenPG} orientation="horizontal"
                                                style={{
                                                    position: 'absolute',
                                                    left: '145px',
                                                    top: '0px',
                                                    zIndex: '101'
                                                }}
                                                timeout={500} unmountOnExit
                                            >
                                                <ul class="menu-list">
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
                                </Collapse> */}

                                {/* <Link to="/colleges" className={classes.link}>
                                    Colleges
                                </Link> */}
                                {!user ? <>
                                    <Link to="/login" className={classes.link}>
                                        Login
                                    </Link>
                                    <Link to="/register" className={classes.link}>
                                        Register
                                    </Link>
                                </> :
                                    <>
                                        <Link to="/account" className={classes.link}>
                                            Hi, {user.name}
                                        </Link>
                                    </>
                                }

                                <button
                                    onMouseOver={() => setModeMenuOpen(true)}
                                    onMouseLeave={() => setModeMenuOpen(false)}
                                    style={{ background: 'transparent', border: 'none', display: 'flex' }}
                                >
                                    <Typography style={{ fontSize: '20px', color: '#fea905' }}>
                                        Mode
                                    </Typography>
                                    <img src={dropDownIcon}></img>
                                </button>
                                <Collapse in={modeMenuOpen} timeout={500} unmountOnExit
                                    onMouseOver={() => setModeMenuOpen(true)}
                                    onMouseLeave={() => setModeMenuOpen(false)}
                                    style={{
                                        position: 'absolute',
                                        zIndex: '100',
                                        top: '70px',
                                        right: '5%'
                                    }
                                    }
                                >
                                    <ul class="menu-list">
                                        <li style={{ listStyleType: 'none', padding: '10px' }}>
                                            <button
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: mode === 'UG' ? 'black' : 'orange',
                                                    borderLeft: mode === 'UG' ? '' : 'black',
                                                    fontWeight: 'bold',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onClick={() => setMode("UG")}
                                            >
                                                Neet UG
                                            </button>
                                        </li>
                                        <li
                                            style={{ listStyleType: 'none', padding: '10px' }}
                                        >
                                            <button
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: mode === 'PG' ? 'black' : '#fea905',
                                                    borderLeft: mode === 'PG' ? '' : 'black',
                                                    fontWeight: 'bold',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onClick={() => setMode("PG")}
                                            >
                                                Neet PG
                                            </button>
                                        </li>
                                    </ul>
                                </Collapse>
                            </div>
                        </Toolbar>
                    </AppBar>
                </>)
            }
        </div >
    )
}

export default Navbar;