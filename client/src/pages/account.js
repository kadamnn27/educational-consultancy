import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from '../api/axios';

import { Paper, Typography, Button, Grow, Stack, Alert, TextField, CircularProgress, MenuItem, Grid, Item } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Cookies from 'js-cookie';
import Colleges from './colleges';
import editIcon from '../images/icons/icons8-edit-row-50.png';
import defaultAvatar from '../images/icons/Default-Avatar.png';

const useStyles = makeStyles(() => ({
    fieldSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "40px",
    },
    text: {
        fontFamily: "Nunito Sans !important",
        fontWeight: "600 !important",
    }
}));

const Account = ({ navbar, setNavbar }) => {
    const { user, setUser, cookieToken, setCookieToken } = useContext(UserContext);

    const [changingDetails, setChangingDetails] = useState(false);

    const [failiure, setFailiure] = useState(null);
    const [success, setSuccess] = useState(null);
    const [responseRecieved, setResponseRecieved] = useState(true);

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    // const [phone, setPhone] = useState(user.phoneno);
    const [feeBudget, setFeeBudget] = useState(null);

    const classes = useStyles();
    // console.log(user);

    useEffect(() => {
        setNavbar(true);
    }, [])

    const handleSubmit = async (e) => {
        // console.log(user.image);
        // e.preventDefault();
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
                await axios.put('/api/v1/youraccount',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${cookieToken}`
                    }
                })
                    .then(res => {
                        // console.log(formData);
                        // console.log(res);
                        setSuccess(res);
                        // console.log(formData.getAll('image'),image,imageURL);

                        // setResponseUser(res.data.user);
                        // console.log(res.data.user);
                        setUser(res.data.user);
                        setResponseRecieved(true);
                    })
                    .catch(err => {
                        setFailiure(err);
                        setResponseRecieved(true);
                        // console.log(err);
                    })
            }
        }
    }

    return (
        <Grid container style={{ padding: '80px 15px 15px 15px' }}>
            {user && Cookies.get('token') ?
                <>
                    <div style={{ width: '100%', display: "flex", flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid black', marginBottom: '20px', paddingBottom: '10px' }}>
                        <Typography className={classes.text} variant="h4">Your Account Details</Typography>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            style={{
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
                            {changingDetails ? "Save details" : "Change details"}
                        </Button>
                    </div>
                    <div style={{ marginTop: "20px", width: '100%' }}>
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
                    <Grid item xs={12} style={{ padding: '15px', background: 'rgba(102,173,255,0.4)', borderRadius: '15px', position: 'relative', top: '50px' }}>
                        {
                            responseRecieved ?
                                <>
                                    <div style={{ width: '100%', height: '60px', background: 'white', position: 'absolute', top: '0px', right: '0px', zIndex: '100' }}></div>
                                    <div style={{ marginTop: "0px" }}>
                                        <div className={classes.fieldSections}>
                                            {changingDetails ?
                                                <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={imageURL} alt="profile" style={{ width: "125px", height: "125px", borderRadius: "50%", objectFit: "cover", zIndex: '101', border: '10px solid white' }} />
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
                                                        <label for="avatar" style={{ background: 'transparent', padding: '0px', width: '0px', height: '0px', margin: '0px', position: 'absolute', zIndex: '102', left: '100px', top: '20px', border: '0px' }}>
                                                            <img src={editIcon} style={{}} width="30px" />
                                                        </label>
                                                        <TextField
                                                            className={classes.text}
                                                            label='Change Name'
                                                            color="warning"
                                                            value={name}
                                                            onChange={(event) => {
                                                                setName(event.target.value);
                                                            }}
                                                            style={{ margin: '0px 0px 10px 20px', zIndex: '102' }}
                                                        />
                                                    </div>

                                                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant="h5" style={{ borderBottom: '2px solid black', marginBottom: '20px' }}>Edit User Info</Typography>
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
                                                </>
                                                :
                                                <Grid container>
                                                    <Grid item md={12} style={{ display: 'flex', alignItems: 'center' }}>
                                                        {user.image ?
                                                            <img src={user.image.secure_url} alt="profile" style={{ width: "125px", height: "125px", borderRadius: "50%", objectFit: "cover", marginRight: '20px', zIndex: '101', border: '10px solid white' }} />
                                                            :
                                                            <img src={defaultAvatar} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginRight: '20px', zIndex: '101' }} />
                                                        }
                                                        <Typography className={classes.text} style={{ color: 'black', textTransform: 'capitalize', fontSize: '2em' }}>{user.name}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} style={{ marginTop: '20px' }}>
                                                        <Typography variant="h5" style={{ borderBottom: '2px solid black', marginBottom: '20px' }}>Personal Info</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Course : </span> {user.course}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Quota : </span> {user.quota}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange',textTransform:'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Category : </span> {user.category}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange',textTransform:'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Gender : </span> {user.gender}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} style={{ marginTop: '20px' }}>
                                                        <Typography variant="h5" style={{ borderBottom: '2px solid black', marginBottom: '20px' }}>Contact Info</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Email : </span> {user.email}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Phone : </span> {user.phoneno}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Address : </span> {user.city} , {user.state.domicile}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} style={{ marginTop: '20px' }}>
                                                        <Typography variant="h5" style={{ borderBottom: '2px solid black', marginBottom: '20px' }}>NEET Details</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET AIR: </span> {user.neet.airRank}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Score: </span> {user.neet.score}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Category Rank: </span> {user.neet.categoryRank}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange',textTransform:'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>NEET Fee Budget: </span> {user.feeBudget}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} style={{ marginTop: '20px' }}>
                                                        <Typography variant="h5" style={{ borderBottom: '2px solid black', marginBottom: '20px' }}>Parent's Occupation</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange',textTransform:'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Father's Occupation: </span> {user.occParent.fatherOccupation}</Typography>
                                                        <Typography className={classes.text} style={{ color: 'darkorange',textTransform:'Capitalize' }}><span style={{ color: 'black', fontSize: '1.1em' }}>Mother's Occupation: </span> {user.occParent.motherOccupation}</Typography>
                                                    </Grid>
                                                </Grid>
                                            }
                                        </div>
                                    </div>
                                </> :
                                <Typography align="center">Your Details are being updated ....<CircularProgress /></Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Colleges navbar={navbar} setNavbar={setNavbar} />
                        <div>
                            <Typography align="center" className={classes.text} variant="h4" style={{ color: 'orange', marginBottom: '20px' }}>
                                Get Exclusive Benifits with our Subscription
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper elevation={3} style={{ background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', margin: '10px', boxShadow: '0px 0px 15px black' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: 'black', padding: '20px 20px 50px 20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
                                            <Typography variant="h4" className={classes.text} style={{ color: 'white' }}>
                                                Free
                                            </Typography>
                                            <Typography variant="body1" className={classes.text} style={{ color: 'white', fontStyle: 'italic' }}>
                                                Free Plan to get you on-board !
                                            </Typography>
                                        </div>
                                        <div style={{padding:'10px'}}>
                                            <ul>
                                                <li>About NEET UG</li>
                                                <li>About MCC UG All India Counselling</li>
                                                <li>About State UG Counselling</li>
                                                <li>State-wise list of Medical Colleges in India</li>
                                                <li>Youtube/Social Media Channel Subscriptions</li>
                                                <li>Case Studies/Blog Posts</li>
                                            </ul>
                                        </div>
                                        <br/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper elevation={3} style={{ background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', margin: '10px', boxShadow: '0px 0px 15px brown' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: '#C2783F', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
                                            <Typography variant="h4" className={classes.text} style={{ color: 'white' }}>
                                                Bronze
                                            </Typography>
                                            <Typography variant="body1" className={classes.text} style={{ color: 'white', fontStyle: 'italic' }}>
                                                Free Plan + Additional Benefits
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    margin: '10px auto 0px auto',
                                                    width: '60%',
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
                                                Join For ₹ 499
                                            </Button>
                                        </div>
                                        <div style={{padding:'10px'}}>
                                            <ul>
                                                <li>Expert ranking of all medical colleges</li>
                                                <li>Fee structure of all medical colleges</li>
                                                <li>Special provisions applicability</li>
                                                <li>Last year category wise cutoff of colleges</li>
                                                <li>Notification alerts for UG counselling</li>
                                            </ul>
                                        </div>
                                        <br />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper elevation={3} style={{ background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', margin: '10px', boxShadow: '0px 0px 15px gray'}}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: '#BBC2CC', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
                                            <Typography variant="h4" className={classes.text} style={{ color: 'white' }}>
                                                Silver
                                            </Typography>
                                            <Typography variant="body1" className={classes.text} style={{ color: 'white', fontStyle: 'italic' }}>
                                                Bronze Plan + Additional Benefits
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    margin: '10px auto 0px auto',
                                                    width: '60%',
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
                                                Join For ₹ 999
                                            </Button>
                                        </div>
                                        <div style={{padding:'10px'}}>
                                            <ul>
                                                <li>Personalized admission probability report</li>
                                                <li>Personalized college predictor as per rank</li>
                                                <li>Category wise, round-wise cutoff of medical colleges</li>
                                                <li>Information about NBBS abroad</li>
                                                <li>Documents lists with scan and save facility</li>
                                            </ul>
                                        </div>
                                        <br />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper elevation={3} style={{ background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', margin: '10px', boxShadow: '0px 0px 15px gold' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: 'gold', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
                                            <Typography variant="h4" className={classes.text} style={{ color: 'white' }}>
                                                Gold
                                            </Typography>
                                            <Typography variant="body1" className={classes.text} style={{ color: 'white', fontStyle: 'italic' }}>
                                                Silver Plan + Additional Benefits
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    margin: '10px auto 0px auto',
                                                    width: '60%',
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
                                                Join For ₹ 2999
                                            </Button>
                                        </div>
                                        <div style={{padding:'10px'}}>
                                            <ul>
                                                <li>Personalized Guidance on Govt/Private/Deemed R1 & R2 counselling</li>
                                                <li>Form Filling</li>
                                                <li>NEET AIR Rank based choice order list of colleges</li>
                                                <li>Merit list and result updates of counselling</li>
                                                <li>Online counselling support by Expert Admission Counsellor - 5</li>
                                                <li>Online Counselling Sessions with Mr. Shamsher Rana - 2</li>
                                            </ul>
                                        </div>
                                        <br />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                <Paper elevation={3} style={{ background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', margin: '10px', boxShadow: '0px 0px 15px #CC9EF5' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: '#CC9EF5', padding: '20px', marginBottom: '15px', borderRadius: '15px 15px 0px 0px' }}>
                                            <Typography variant="h4" className={classes.text} style={{ color: 'white' }}>
                                                Platinum
                                            </Typography>
                                            <Typography variant="body1" className={classes.text} style={{ color: 'white', fontStyle: 'italic' }}>
                                                Gold Plan + Additional Benefits
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    margin: '10px auto 0px auto',
                                                    width: '60%',
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
                                                Join For ₹ 5999
                                            </Button>
                                        </div>
                                        <div style={{padding:'10px'}}>
                                        <ul>
                                            <li>NRI Quota Admission Counselling</li>
                                            <li>Management seat admission counsellng</li>
                                            <li>Mop up round counselling</li>
                                            <li>Stray vacancy round counselling</li>
                                            <li>MBBS Abroad Admission Counselling</li>
                                            <li>Online counselling support by Expert Admission Counsellor - Unlimited</li>
                                            <li>Online Counselling Sessions with Mr. Shamsher Rana - 5</li>
                                        </ul>
                                        </div>
                                        <br />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
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
        </Grid>
    )
}

export default Account;