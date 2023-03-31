import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

import { Paper, Typography, Button, Grow, Stack, Alert, TextField, CircularProgress, MenuItem, Grid, Item, Box } from '@mui/material';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Colleges from './colleges';
import editIcon from '../images/icons/icons8-edit-row-50.png';
import defaultAvatar from '../images/icons/Default-Avatar.png';
import saveIcon from '../images/icons/icons8-save-50.png';
import logoutIconWhite from '../images/icons/icons8-logout-rounded-white-50.png';
import logoutIconBlack from '../images/icons/icons8-logout-rounded-black-50.png';
import check from '../images/icons/accept.png';
import cross from '../images/icons/cross.png';

import Cookies from 'js-cookie';
import axios from '../api/axios';
import { Navigate, useNavigate } from "react-router-dom";
const LOGOUT_URL = '/api/v1/logout';

const useStyles = makeStyles(() => ({
    fieldSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "40px",
    },
    text1: {
        fontFamily: "Nunito Sans !important",
        fontWeight: "800 !important",
    },
    text2: {
        fontFamily: "Nunito Sans !important",
        fontWeight: "600 !important",
    },
    text3: {
        fontFamily: "Nunito Sans !important",
        fontWeight: "300 !important",
    },
    dashboard: {
        marginTop: "20px",
        display: 'flex',
        marginBottom: '20px'
    },
    sidebar_menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '20px'
    },
    sidebar: {
        width: '20%',
        minHeight: '100%',
        backgroundColor: 'white',
        borderRadius: '0px 20px 20px 0px',
    },
    sidebar_button: {
        color: 'black !important',
        margin: '10px !important',
        "&:hover": {
            background: 'rgba(0,0,0,0.1) !important',
        }
    },
    sidebar_button_active: {
        background: '#1769aa !important',
        color: 'white !important',
        width: '80%',
        margin: '20px !important'
    },
    main: {
        width: '100%',
        margin: 'auto',
        padding: '0px 20px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    profile_paper: {
        padding: '20px',
        marginTop: '20px',
        borderRadius: '20px !important',
    },
    membership_paper: {
        borderRadius: "20px !important",
        maxHeight: '600px',
        // maxWidth: '250px',
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 20px',
        // overflow: 'scroll',
        // ['@media(min-width: 1250px)']: {
        //     width: '600px'
        // },
        // ['@media(max-width: 768px)']: {
        //     width: '350px'
        // },
    },
    membership_perks: {
        borderRadius: "20px 0px 0px 20px",
        maxWidth: '250px',
        position: 'sticky',
        left: '-30px',
        zIndex: '1000',
        background: 'white',
        // paddingLeft:'5px'
        // overflowX: 'scroll',
    },
    membership_perks_list: {
        paddingLeft: '20px',
        width: "202px",
        background: 'white',
        // postion:'relative',
        // top:'200px'
        // marginTop:'140px'
    },
    memberships_area: {
        display: 'flex',
        // overflowX: 'scroll',
        height: '100%',
        width: '100%',
        // overflowY: 'auto'
    },
    membership_area: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '170px',
        padding: '0px 25px',
        margin: '0px 10px'
    },
    membership_headers: {
        display: 'flex',
        position: 'sticky',
        top: '-10px',
        zIndex: '1000',
        background: 'white',
        overflowX: 'hidden',
        minHeight: '120px',
        width: '500px',
        ['@media(min-width: 1350px)']: {
            width: '100%'
        },
        ['@media(max-width: 768px)']: {
            width: '350px'
        },
    },
    membership_header: {
        borderRadius: "20px",
        padding: "25px",
        minWidth: '170px',
        margin: '10px',
    },
    membership_body: {
        display: 'flex',
        width: '500px',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            // display:'none',
            height: '3px',
            width: '3px'
        },
        ['@media(min-width: 1350px)']: {
            width: '100%'
        },
        ['@media(max-width: 768px)']: {
            width: '350px'
        },
    },
    membership_content: {
        // padding: '10px',
        marginTop: '23px',
        width: '20px',
    },
    membership_content_item: {
        display: 'flex',
        // alignItems: 'center',
        // marginBottom: '10px'
    },
    membership_content_item_icon: {
        height: '15px',
        marginRight: '5px',
        position: 'relative',
        top: '3px'
    },
    membership_content_item_text: {
        fontSize: '14px !important',
        color: 'black'
    },
    membership_content_item_text_disabled: {
        fontSize: '14px !important',
        color: '#999999'
    },
    membership_footers: {
        display: 'flex',
        position: 'sticky',
        top: '-10px',
        zIndex: '1000',
        background: 'white',
        overflow: 'hidden',
        minHeight: '70px',
        width: '300px',
        marginLeft: '200px',
        ['@media(min-width: 1350px)']: {
            width: '83%'
        },
        ['@media(max-width: 768px)']: {
            width: '150px'
        },
    },
    membership_footer_button: {
        borderRadius: "20px",
        padding: "10px 25px",
        minWidth: '170px',
        margin: '10px',
        cursor: 'pointer',
        '&:hover,&:focus': {
            background: 'white !important',
            '&:nth-child(1)': {
                color: '#444 !important',
                boxShadow: '0px 0px 0px 2px #444 inset !important',
            },
            '&:nth-child(2)': {
                color: '#C2783F !important',
                boxShadow: '0px 0px 0px 2px #C2783F inset !important',
            },
            '&:nth-child(3)': {
                color: '#A8A9AD !important',
                boxShadow: '0px 0px 0px 2px #A8A9AD inset !important',
            },
            '&:nth-child(4)': {
                color: '#EEBC1D !important',
                boxShadow: '0px 0px 0px 2px #EEBC1D inset !important',
            },
            '&:nth-child(5)': {
                color: '#B20A2C !important',
                boxShadow: '0px 0px 0px 2px #B20A2C inset !important',
            }
        },
    }
    
}));

const Account = ({ navbar, setNavbar }) => {
    const { user, setUser, cookieToken, setCookieToken, accountPage, setAccountPage } = useContext(UserContext);

    const [changingDetails, setChangingDetails] = useState(false);

    const [failiure, setFailiure] = useState(null);
    const [success, setSuccess] = useState(null);
    const [responseRecieved, setResponseRecieved] = useState(true);

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [feeBudget, setFeeBudget] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        setNavbar(true);
    }, [])

    const navigate = useNavigate();

    let scrollableBody;
    let scrollableHeaders;
    let scrollableFooters;

    if (document.getElementById('scrollableBody') && document.getElementById('scrollableHeaders')) {
        scrollableBody = document.getElementById('scrollableBody');
        scrollableHeaders = document.getElementById('scrollableHeaders');
        scrollableFooters = document.getElementById('scrollableFooters');
        scrollableBody.addEventListener('scroll', function () {
            scrollableHeaders.scrollLeft = this.scrollLeft;
            scrollableFooters.scrollLeft = this.scrollLeft;
        })
    }


    const handleSubmit = async (e) => {
        if (!changingDetails) {
            if (user.image) {
                setImage(user.image);
                setImageURL(user.image.secure_url);
            }
            setName(user.name);
            setEmail(user.email);
            setFeeBudget(user.feeBudget);
            setChangingDetails(true);
        }
        else {
            setResponseRecieved(false);
            if (name.length > 0 && email.length > 0) {
                setChangingDetails(false);
                // console.log(image);
                // console.log(imageURL);
                const formData = new FormData();
                formData.append('image', image);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('feeBudget', feeBudget);
                await axios.put('/api/v1/youraccount',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${cookieToken}`
                    }
                })
                    .then(res => {
                        setSuccess(res);
                        setUser(res.data.user);
                        setResponseRecieved(true);
                    })
                    .catch(err => {
                        setFailiure(err);
                        setResponseRecieved(true);
                    })
            }
        }
    }

    const [selectedItem, setSelectedItem] = useState('Profile');
    let content;
    useEffect(() => {
        setSelectedItem(accountPage);
    }, [accountPage])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    if (selectedItem === 'Profile' && user) {
        content = !changingDetails ? (
            <div>
                <Paper elevation={3} className={classes.profile_paper} style={{ display: 'flex', alignItems: 'center' }}>
                    {user.image ?
                        <img src={user.image.secure_url} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginRight: '20px', zIndex: '101' }} />
                        :
                        <img src={defaultAvatar} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginRight: '20px', zIndex: '101' }} />
                    }
                    <Typography className={classes.text2} style={{ color: 'black', textTransform: 'capitalize', fontSize: '2em' }}>{user.name}</Typography>
                    {!isMobile ?
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            style={{
                                marginLeft: 'auto',
                                fontFamily: "Nunito Sans",
                                fontWeight: "600",
                                background: "white",
                                color: "black",
                                borderRadius: "10px",
                                transition: "all 0.5s ease",
                                border: "2px solid orange",
                                "&:hover,&:focus": {
                                    boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
                                    color: "#fea905",
                                    background: "linear-gradient(to right bottom,black,#0411af)"
                                }
                            }}
                        >
                            Edit Info
                        </Button>
                        :
                        <Button
                            onClick={handleSubmit}
                            style={{
                                marginLeft: 'auto',
                                background: 'transparent',
                            }}
                        >
                            <img src={editIcon} width="40px" />
                        </Button>
                    }
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={3} style={{ minHeight: '250px' }} className={classes.profile_paper}>
                            <Typography variant="h5" className={classes.text1} style={{ marginBottom: '20px' }}>Personal Info</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Course : </span> {user.course}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Quota : </span> {user.quota}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange', textTransform: 'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Category : </span> {user.category}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange', textTransform: 'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Gender : </span> {user.gender}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={3} style={{ minHeight: '250px' }} className={classes.profile_paper}>
                            <Typography variant="h5" className={classes.text1} style={{ marginBottom: '20px' }}>Contact Info</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Email : </span> {user.email}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Phone : </span> {user.phoneno}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Address : </span> {user.city} , {user.state.domicile}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={3} style={{ minHeight: '250px' }} className={classes.profile_paper}>
                            <Typography variant="h5" className={classes.text1} style={{ marginBottom: '20px' }}>NEET Details</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET AIR: </span> {user.neet.airRank}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Score: </span> {user.neet.score}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Category Rank: </span> {user.neet.categoryRank}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange', textTransform: 'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Fee Budget: </span> {user.feeBudget}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={3} style={{ minHeight: '250px' }} className={classes.profile_paper}>
                            <Typography variant="h5" className={classes.text1} style={{ marginBottom: '20px' }}>Parent's Occupation</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange', textTransform: 'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Father's Occupation: </span> {user.occParent.fatherOccupation}</Typography></Grid>
                                <Grid item xs={12} md={6}><Typography className={classes.text} style={{ color: 'darkorange', textTransform: 'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Mother's Occupation: </span> {user.occParent.motherOccupation}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        ) : (
            <Paper elevation={3} className={classes.profile_paper}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" className={classes.text1}>Edit User Info</Typography>
                    {!isMobile ?
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            style={{
                                marginLeft: 'auto',
                                fontFamily: "Nunito Sans",
                                fontWeight: "600",
                                background: "white",
                                color: "black",
                                borderRadius: "10px",
                                transition: "all 0.5s ease",
                                border: "2px solid orange",
                                "&:hover,&:focus": {
                                    boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
                                    color: "#fea905",
                                    background: "linear-gradient(to right bottom,black,#0411af)"
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                        :
                        <Button
                            onClick={handleSubmit}
                            style={{
                                marginLeft: 'auto',
                                background: 'transparent',
                            }}
                        >
                            <img src={saveIcon} width="40px" />
                        </Button>
                    }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <img src={imageURL} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", zIndex: '101' }} />
                    <input
                        hidden
                        id="avatar"
                        type="file"
                        accepts="image/*"
                        name="image"
                        onChange={(event) => {
                            setImageURL(URL.createObjectURL(event.target.files[0]));
                            setImage(event.target.files[0]);
                        }}
                    />
                    <label for="avatar" style={{ border: '0px', background: 'transparent', position: 'relative', bottom: '50px', right: '35px', zIndex: '102', width: '30px', height: "25px", padding: '0px', margin: '0px' }}>
                        <img src={editIcon} style={{ background: 'transparent' }} width="30px" />
                    </label>
                    <TextField
                        className={classes.text}
                        label='Change Name'
                        color="warning"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        style={{}}
                    />
                </div>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        className={classes.text}
                        label='Change Email'
                        color="warning"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        style={{ margin: '10px' }}
                    />
                    <TextField
                        className={classes.text}
                        type="number"
                        label='Enter Annual Fee Budget (in INR)'
                        color="warning"
                        value={feeBudget}
                        onChange={(event) => {
                            setFeeBudget(event.target.value);
                        }}
                        style={{ margin: '10px' }}
                    />
                </div>
            </Paper>
        )
    } else if (selectedItem === 'Colleges') {
        content = (
            <Colleges navbar={navbar} setNavbar={setNavbar} />
        )
    } else if (selectedItem === 'Membership Settings') {
        content = (
            <Box>
                <Paper elevation={3} className={classes.membership_paper}>
                    <div className={classes.membership_headers} id='scrollableHeaders'>
                        <div style={{ position: 'sticky', left: '-30px', background: 'white', width: '205px', display: 'flex', justifyContent: 'center', border: '0px' }}>
                            <div className={classes.membership_header} style={{ background: '#1769aa' }}>
                                <Typography variant="h6" align="center" className={classes.text1} style={{ color: 'white' }}>
                                    Membership <br /> Perks
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.membership_header} style={{ background: '#444444' }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{ color: 'white' }}>
                                Starter
                            </Typography>
                        </div>
                        <div className={classes.membership_header} style={{ background: '#C2783F' }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{ color: 'white' }}>
                                Bronze
                            </Typography>
                        </div>
                        <div className={classes.membership_header} style={{ background: '#A8A9AD' }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{ color: 'white' }}>
                                Silver
                            </Typography>
                        </div>
                        <div className={classes.membership_header} style={{ background: '#EEBC1D' }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{ color: 'white' }}>
                                Gold
                            </Typography>
                        </div>
                        <div className={classes.membership_header} style={{ background: 'linear-gradient(to left, #ffeba5, #b20a2c)' }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{ color: 'white' }}>
                                Platinum
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.membership_body} id="scrollableBody">
                        <div className={classes.membership_perks}>
                            <div className={classes.membership_perks_list}>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    About NEET UG
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    About MCC UG All India Counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    About State UG Counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    State-wise list of Medical Colleges in India
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Youtube/Social Media Channel Subscriptions
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Case Studies/Blog Posts
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Expert Ranking of all Medical Colleges
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Fee Structure of all Medical Colleges
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Special provisions applicability
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Last year category wise cutoff of colleges
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Notification alerts for UG counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Personalized admission probability report
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Personalized college predictor as per rank
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Category wise, round-wise cutoff of medical colleges
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Information about MBBS abroad
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Documents lists with scan and save facility
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Personalized Guidance on Govt/Private/Deemed R1 & R2 counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Form Filling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    NEET AIR Rank based choice order list of colleges
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Merit list and result updates of counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Online counselling support by Expert Admission Counsellor
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Online Counselling Sessions with Mr. Shamsher Rana
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    NRI Quota Admission Counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Management seat admission counsellng
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Mop up round counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    Stray vacancy round counselling
                                </Typography>
                                <Typography variant="body1" style={{ margin: '25px 10px' }} className={classes.text2}>
                                    MBBS Abroad Admission Counselling
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.memberships_area}>
                            <div className={classes.membership_area}>
                                <div className={classes.membership_content}>
                                    <div style={{ marginTop: '0px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '38px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '34px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '84px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '83px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '56px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.membership_area}>
                                <div className={classes.membership_content}>
                                    <div style={{ marginTop: '0px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '38px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '34px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '84px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '83px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '56px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.membership_area}>
                                <div className={classes.membership_content}>
                                    <div style={{ marginTop: '0px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '38px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '34px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '84px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '83px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '56px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.membership_area}>
                                <div className={classes.membership_content}>
                                    <div style={{ marginTop: '0px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '38px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '34px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '84px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                        <Typography variant="body1" className={classes.text2}>
                                            5
                                        </Typography>
                                    </div>
                                    <div style={{ marginTop: '96px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                        <Typography variant="body1" className={classes.text2}>
                                            2
                                        </Typography>
                                    </div>
                                    <div style={{ marginTop: '74px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '56px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={cross} className={classes.membership_content_item_icon} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.membership_area}>
                                <div className={classes.membership_content}>
                                    <div style={{ marginTop: '0px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '38px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '80px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '105px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '34px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '84px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '82px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                        <Typography variant="body1" className={classes.text2}>
                                            Unlimited
                                        </Typography>
                                    </div>
                                    <div style={{ marginTop: '96px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                        <Typography variant="body1" className={classes.text2}>
                                            5
                                        </Typography>
                                    </div>
                                    <div style={{ marginTop: '74px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '58px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '60px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '56px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                    <div style={{ marginTop: '57px' }} className={classes.membership_content_item}>
                                        <img src={check} className={classes.membership_content_item_icon} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.membership_footers} id='scrollableFooters'>

                        <div className={classes.membership_footer_button} style={{
                            background: '#444444',
                            padding: '10px 0px',
                            color: 'white'
                        }}>
                            <Typography variant="h5" align="center" className={classes.text1} style={{
                                fontSize: '20px'
                            }}>
                                Continue for free
                            </Typography>
                        </div>
                        <div className={classes.membership_footer_button} style={{
                            background: '#C2783F', color: 'white',
                        }}>
                            <Typography variant="h5" align="center" className={classes.text1}>
                                ₹ 499
                            </Typography>
                        </div>
                        <div className={classes.membership_footer_button} style={{
                            background: '#A8A9AD', color: 'white'
                        }}>
                            <Typography variant="h5" align="center" className={classes.text1}>
                                ₹ 999
                            </Typography>
                        </div>
                        <div className={classes.membership_footer_button} style={{
                            background: '#EEBC1D', color: 'white'
                        }}>
                            <Typography variant="h5" align="center" className={classes.text1}>
                                ₹ 2999
                            </Typography>
                        </div>
                        <div className={classes.membership_footer_button} style={{
                            background: 'linear-gradient(to left, #ffeba5, #b20a2c)', color: 'white'
                        }}>
                            <Typography variant="h5" align="center" className={classes.text1}>
                                ₹ 5999
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </Box>
        )
        // content = (
        //     <Grid container>
        //         <Grid item lg={4} md={6} sm={12}>
        //             <Paper elevation={3} className={classes.membership_paper} style={{ boxShadow: '0px 0px 15px black' }}>
        //                 <div style={{ display: 'flex', flexDirection: 'column', background: 'black', padding: '20px 20px 70px 20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
        //                     <Typography variant="h4" className={classes.text1} style={{ color: 'white' }}>
        //                         Free
        //                     </Typography>
        //                     <Typography variant="body1" className={classes.text3} style={{ color: 'white', fontStyle: 'italic' }}>
        //                         Free Plan to get you on-board !
        //                     </Typography>
        //                 </div>
        //                 <div style={{ padding: '10px' }}>
        //                     <ul>
        //                         <li>About NEET UG</li>
        //                         <li>About MCC UG All India Counselling</li>
        //                         <li>About State UG Counselling</li>
        //                         <li>State-wise list of Medical Colleges in India</li>
        //                         <li>Youtube/Social Media Channel Subscriptions</li>
        //                         <li>Case Studies/Blog Posts</li>
        //                     </ul>
        //                 </div>
        //                 <br />
        //             </Paper>
        //         </Grid>
        //         <Grid item lg={4} md={6} sm={12}>
        //             <Paper elevation={3} className={classes.membership_paper} style={{ boxShadow: '0px 0px 15px brown' }}>
        //                 <div style={{ display: 'flex', flexDirection: 'column', background: '#C2783F', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
        //                     <Typography variant="h4" className={classes.text1} style={{ color: 'white' }}>
        //                         Bronze
        //                     </Typography>
        //                     <Typography variant="body1" className={classes.text3} style={{ color: 'white', fontStyle: 'italic' }}>
        //                         Free Plan + Additional Benefits
        //                     </Typography>
        //                     <Button
        //                         variant="contained"
        //                         style={{
        //                             margin: '10px auto 0px auto',
        //                             width: '60%',
        //                             fontFamily: "Nunito Sans",
        //                             fontWeight: "600",
        //                             background: "white",
        //                             color: "black",
        //                             borderRadius: "10px",
        //                             transition: "all 0.5s ease",
        //                             border: "2px solid orange",
        //                             "&:hover,&:focus": {
        //                                 boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
        //                                 color: "#fea905",
        //                                 background: "linear-gradient(to right bottom,black,#0411af)"
        //                             }
        //                         }}
        //                     >
        //                         Join For ₹ 499
        //                     </Button>
        //                 </div>
        //                 <div style={{ padding: '10px' }}>
        //                     <ul>
        //                         <li>Expert ranking of all medical colleges</li>
        //                         <li>Fee structure of all medical colleges</li>
        //                         <li>Special provisions applicability</li>
        //                         <li>Last year category wise cutoff of colleges</li>
        //                         <li>Notification alerts for UG counselling</li>
        //                     </ul>
        //                 </div>
        //                 <br />
        //                 <br />
        //             </Paper>
        //         </Grid>
        //         <Grid item lg={4} md={6} sm={12}>
        //             <Paper elevation={3} className={classes.membership_paper} style={{ boxShadow: '0px 0px 15px gray' }}>
        //                 <div style={{ display: 'flex', flexDirection: 'column', background: '#A8A9AD', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
        //                     <Typography variant="h4" className={classes.text1} style={{ color: 'white' }}>
        //                         Silver
        //                     </Typography>
        //                     <Typography variant="body1" className={classes.text3} style={{ color: 'white', fontStyle: 'italic' }}>
        //                         Bronze Plan + Additional Benefits
        //                     </Typography>
        //                     <Button
        //                         variant="contained"
        //                         style={{
        //                             margin: '10px auto 0px auto',
        //                             width: '60%',
        //                             fontFamily: "Nunito Sans",
        //                             fontWeight: "600",
        //                             background: "white",
        //                             color: "black",
        //                             borderRadius: "10px",
        //                             transition: "all 0.5s ease",
        //                             border: "2px solid orange",
        //                             "&:hover,&:focus": {
        //                                 boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
        //                                 color: "#fea905",
        //                                 background: "linear-gradient(to right bottom,black,#0411af)"
        //                             }
        //                         }}
        //                     >
        //                         Join For ₹ 999
        //                     </Button>
        //                 </div>
        //                 <div style={{ padding: '10px' }}>
        //                     <ul>
        //                         <li>Personalized admission probability report</li>
        //                         <li>Personalized college predictor as per rank</li>
        //                         <li>Category wise, round-wise cutoff of medical colleges</li>
        //                         <li>Information about NBBS abroad</li>
        //                         <li>Documents lists with scan and save facility</li>
        //                     </ul>
        //                 </div>
        //                 <br />
        //             </Paper>
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <Paper elevation={3} className={classes.membership_paper} style={{ boxShadow: '0px 0px 15px gold' }}>
        //                 <div style={{ display: 'flex', flexDirection: 'column', background: '#EEBC1D', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
        //                     <Typography variant="h4" className={classes.text1} style={{ color: 'white' }}>
        //                         Gold
        //                     </Typography>
        //                     <Typography variant="body1" className={classes.text3} style={{ color: 'white', fontStyle: 'italic' }}>
        //                         Silver Plan + Additional Benefits
        //                     </Typography>
        //                     <Button
        //                         variant="contained"
        //                         style={{
        //                             margin: '10px auto 0px auto',
        //                             width: '60%',
        //                             fontFamily: "Nunito Sans",
        //                             fontWeight: "600",
        //                             background: "white",
        //                             color: "black",
        //                             borderRadius: "10px",
        //                             transition: "all 0.5s ease",
        //                             border: "2px solid orange",
        //                             "&:hover,&:focus": {
        //                                 boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
        //                                 color: "#fea905",
        //                                 background: "linear-gradient(to right bottom,black,#0411af)"
        //                             }
        //                         }}
        //                     >
        //                         Join For ₹ 2999
        //                     </Button>
        //                 </div>
        //                 <div style={{ padding: '10px' }}>
        //                     <ul>
        //                         <li>Personalized Guidance on Govt/Private/Deemed<br /> R1 & R2 counselling</li>
        //                         <li>Form Filling</li>
        //                         <li>NEET AIR Rank based choice order list of colleges</li>
        //                         <li>Merit list and result updates of counselling</li>
        //                         <li>Online counselling support by<br /> Expert Admission Counsellor - 5</li>
        //                         <li>Online Counselling Sessions with<br /> Mr. Shamsher Rana - 2</li>
        //                     </ul>
        //                 </div>
        //                 <br />
        //             </Paper>
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <Paper elevation={3} className={classes.membership_paper} style={{ boxShadow: '0px 0px 15px #b20a2c' }}>
        //                 <div style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(to left, #ffebd5, #b20a2c)', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
        //                     <Typography variant="h4" className={classes.text1} style={{ color: 'white' }}>
        //                         Platinum
        //                     </Typography>
        //                     <Typography variant="body1" className={classes.text3} style={{ color: 'white', fontStyle: 'italic' }}>
        //                         Gold Plan + Additional Benefits
        //                     </Typography>
        //                     <Button
        //                         variant="contained"
        //                         style={{
        //                             margin: '10px auto 0px auto',
        //                             width: '60%',
        //                             fontFamily: "Nunito Sans",
        //                             fontWeight: "600",
        //                             background: "white",
        //                             color: "black",
        //                             borderRadius: "10px",
        //                             transition: "all 0.5s ease",
        //                             border: "2px solid orange",
        //                             "&:hover,&:focus": {
        //                                 boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
        //                                 color: "#fea905",
        //                                 background: "linear-gradient(to right bottom,black,#0411af)"
        //                             }
        //                         }}
        //                     >
        //                         Join For ₹ 5999
        //                     </Button>
        //                 </div>
        //                 <div style={{ padding: '10px' }}>
        //                     <ul>
        //                         <li>NRI Quota Admission Counselling</li>
        //                         <li>Management seat admission counsellng</li>
        //                         <li>Mop up round counselling</li>
        //                         <li>Stray vacancy round counselling</li>
        //                         <li>MBBS Abroad Admission Counselling</li>
        //                         <li>Online counselling support by<br /> Expert Admission Counsellor - Unlimited</li>
        //                         <li>Online Counselling Sessions with<br /> Mr. Shamsher Rana - 5</li>
        //                     </ul>
        //                 </div>
        //                 <br />
        //             </Paper>
        //         </Grid>
        //     </Grid>
        // )
    } else if (selectedItem === 'Logout') {
        content = (<Typography className={classes.text1} style={{ color: 'black' }}>Logging you out ... <CircularProgress color="primary" /></Typography>)
    }

    return (
        <div style={{ marginTop: '80px' }}>
            {user && Cookies.get('token') ?
                <>
                    <div style={{ width: '100%' }}>
                        {
                            success ? <Grow in timeout={500}>
                                <Alert onClose={() => setSuccess(false)}>
                                    Your details have been updated !
                                </Alert>
                            </Grow> : failiure ?
                                <Grow in timeout={500}>
                                    <Alert onClose={() => setSuccess(false)} severity="error">
                                        {`${failiure}`}
                                    </Alert>
                                </Grow> : null
                        }
                    </div>
                    {responseRecieved ?
                        (<div className={classes.dashboard}>
                            {!isMobile ?
                                <Paper style={{ borderRadius: '0px 20px 20px 0px' }} elevation={5} className={classes.sidebar}>
                                    <Typography align="center" variant="h5" style={{ color: 'white', background: '#1769aa', padding: '20px 10px', borderRadius: '0px 20px 0px 0px' }} className={classes.text1}>
                                        Navigation
                                    </Typography>
                                    <div className={classes.sidebar_menu}>
                                        <Button onClick={() => setSelectedItem('Profile')} className={selectedItem === 'Profile' ? `${classes.sidebar_button_active}` : `${classes.sidebar_button}`}>Profile</Button>
                                        <Button onClick={() => setSelectedItem('Colleges')} className={selectedItem === 'Colleges' ? `${classes.sidebar_button_active}` : `${classes.sidebar_button}`}>Colleges</Button>
                                        <Button onClick={() => setSelectedItem('Membership Settings')} className={selectedItem === 'Membership Settings' ? `${classes.sidebar_button_active}` : `${classes.sidebar_button}`}>Membership</Button>
                                        <Button onClick={() => {
                                            setSelectedItem('Logout');
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
                                                        navigate('/');
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });

                                            }
                                            catch (error) {
                                                console.log(error)
                                            }
                                        }}
                                            className={selectedItem === "Logout" ? classes.sidebar_button_active : classes.sidebar_button}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            Logout
                                            <img src={selectedItem === "Logout" ? logoutIconWhite : logoutIconBlack} style={{ marginLeft: '5px' }} width="20px" />
                                        </Button>
                                    </div>
                                </Paper>
                                : null}

                            <div className={classes.main}>
                                {content}
                            </div>
                        </div>)
                        :
                        (<Paper style={{ margin: '20px 100px' }} elevation={3} className={classes.profile_paper}>
                            <Typography align="center" className={classes.text2} color="primary">Changing your info ... <CircularProgress color="primary" /></Typography>
                        </Paper>)
                    }
                </>
                :
                <Grow in timeout={500}>
                    <Stack sx={{ width: '100%' }}>
                        <Alert
                            severity="error"
                            action={
                                <Button href="/login" color="inherit" size="small">
                                    Login
                                </Button>
                            }
                        >
                            You need to Login First
                        </Alert>
                    </Stack>
                </Grow>
            }
        </div>
    )
}

export default Account;