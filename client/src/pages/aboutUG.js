import React, { useState, useEffect, useContext } from 'react';
import { Typography, Paper } from '@mui/material';

const AboutUG = ({ navbar, setNavbar }) => {
    useEffect(() => {
        setNavbar(true);
    }, [])
    return (
        <div style={{margin:'80px auto'}}>
            <Typography align="center" variant="h2"
                style={{
                    color: "orange",
                    textShadow: "1px 1px 3px #0411af",
                    marginBottom: "10px",
                    fontFamily: "Nunito Sans",
                    fontWeight: "600"
                }}>
                NEET UG
            </Typography>
        </div>
    )
}

export default AboutUG;