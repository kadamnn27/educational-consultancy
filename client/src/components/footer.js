import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography, makeStyles, Paper, Container } from '@material-ui/core';
import { Instagram, Facebook, Mail, Phone, Telegram, Business } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    text: {
        color: "white",
        fontFamily: "Nunito Sans",
        fontWeight: "600"
    },
    paper: {
        color: "white",
        backgroundColor: '#343538',
        padding: "20px",
        marginTop: "20px",
        boxShadow: "2px 2px 1px 1px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 5px 0px #ECDE65",
        ['@media (max-width:400px)']: {
            padding: '10px'
        }
    },
    icons: {
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "20px"
    },
    textField: {
        backgroundColor: "#8C8C8C",
        borderRadius: "30px",
        color: "white",
        width: "20em"
    },
    textFieldArea: {
        padding: "20px",
        ['@media (max-width:460px)']: {
            padding: "0px",
            marginTop: "10px",
            height: "50px"
            // marginBottom:"0px"
        }

    },
    submitBtn: {
        backgroundColor: "#fea907",
        borderRadius: "20px",
        width: "7em",
        height: "3.7em",
        position: "relative",
        right: "50px",
        ['@media (max-width:507px)']: {
            right: "0px",
            bottom: "55px",
            left: "200px",
        },
        "&:hover,&:focus": {
            color: "orange",
            background: "black"
        }
    },
    icon: {
        // margin: "20px",
        color: "orange"
    },
    termsBtn: {
        backgroundColor: 'white',
        color: 'black', // Text color
        padding: '5px 10px', // Adjust padding as needed
        borderRadius: '5px', // Rounded corners
        border: '1px solid black', // Border style
        '&:hover': {
            backgroundColor: 'black', // Background color on hover
            color: 'white', // Text color on hover
        }
    },
    refundbtn: {
        backgroundColor: 'white',
        color: 'black', // Text color
        padding: '5px 10px', // Adjust padding as needed
        borderRadius: '5px', // Rounded corners
        border: '1px solid black', // Border style
        '&:hover': {
            backgroundColor: 'black', // Background color on hover
            color: 'white', // Text color on hover
        }
    },
}));


const Footer = () => {
    const classes = useStyles();
    return (
        <Box
            style={{
                backgroundColor: '#27282B',
                padding: '20px'
            }}
        >
            <Grid container justify="space-around">
                <Grid item xs={12} md={5}>
                    <Paper elevation={6} className={classes.paper}>
                        <Typography className={classes.text} variant="h5">Reach Us</Typography>
                        <Typography className={classes.text} variant="body2">Contact our Support team</Typography>
                        <Grid container spacing={2} justify="space-between">
                            <Grid item md={12} xs={12} >
                                <Button size="small" backgroundColor="white" color="white" style={{ backgroundColor: "#444548", color: "white" }}>
                                    <Mail /><a href="mailto: expertec104@gmail.com" style={{textDecoration: "none",color:"inherit"}} >expertec104@gmail.com</a>
                                </Button>
                            </Grid>
                            <Grid item md={12} xs={12} >
                                <Button size="small" backgroundColor="white" color="white" style={{ backgroundColor: "#444548", color: "white" }}>
                                    <Business /><a href="https://goo.gl/maps/GmhC671p6ZArtr2B8" style={{textDecoration: "none",color:"inherit"}}>104,Aditya Complex 2, D-Block,Central Market,Prashant Vihar,Delhi-110085</a>
                                </Button>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Button size="small" backgroundColor="white" color="white" style={{ backgroundColor: "#444548", color: "white" }}>
                                    <Phone /><a href="tel:9313555010" style={{textDecoration: "none",color:"inherit"}} >9313555010</a>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={6} className={classes.paper}>
                        <Typography className={classes.text} variant="h5">Subscribe to our Newsletter</Typography>
                        <Typography className={classes.text} variant="body2">Get Daily Updates</Typography>
                        <Container className={classes.textFieldArea}>
                            <TextField className={classes.textField} id="filled-standard" label="Enter your email" variant="filled" />
                            <Button size="large" className={classes.submitBtn}>Submit</Button>
                            <Button size="large" className={classes.submitBtn}>Submit</Button>
                            <Link to="/TermsAndConditions" className={classes.link}>
                                <Button size="large" className={classes.termsBtn}>
                                  Terms And Conditions
                                </Button>
                            </Link>
                            <Link to="/RefundPolicies" className={classes.link}>
                                <Button size="large" className={classes.refundBtn}>
                                  Refund Policies
                                </Button>
                            </Link>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
            <Paper elevation={6} className={classes.paper}>
                <Typography>
                    Contact us via our Socials
                </Typography>
                <Box
                    className={classes.icons}
                >
                    <a target="_blank" href="https://www.instagram.com/experteducationalconsultancy/?hl=en"><Instagram className={classes.icon} /></a>
                    <a target="_blank" href="https://www.facebook.com/ExpertEducatoinalConsultancy"><Facebook className={classes.icon} /></a>
                    <a target="_blank" href="https://t.me/ExpertNEETUG"><Telegram className={classes.icon} /></a>
                </Box>
            </Paper>
        </Box>
    )
}

export default Footer;
