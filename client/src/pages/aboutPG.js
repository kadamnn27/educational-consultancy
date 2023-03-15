import React,{useState,useEffect,useContext} from 'react';
import {Typography,Paper} from '@mui/material';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    text: {
        fontFamily: "Nunito Sans",
        fontWeight: "600",
        textAlign: "justify",
        textJustify: "inter-word",
    }
}));

const AboutPG = ({navbar,setNavbar}) => {
    useEffect(() => {
        setNavbar(true);
    }, [])
    const classes = useStyles();
    return (
        <div style={{margin:'80px auto',padding:'20px'}}>
            <Typography align="center" variant="h2"
                style={{
                    color: "orange",
                    textShadow: "1px 1px 3px #0411af",
                    marginBottom: "10px",
                    fontFamily: "Nunito Sans",
                    fontWeight: "600"
                }}>
                NEET PG
            </Typography>
            <Typography variant="h4" className={classes.text} style={{color:'orange'}}>Introduction</Typography>
            <Typography variant="body1" className={classes.text}>
            {/*write content introducting NEET PG*/}


            </Typography>
        </div>
    )
}

export default AboutPG;
                        

