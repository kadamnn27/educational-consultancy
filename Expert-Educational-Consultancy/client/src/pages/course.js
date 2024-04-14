import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../UserContext";
import { Paper } from '@mui/material';

const Course = ({ navbar, setNavbar }) => {
    useEffect(() => {
        setNavbar(true);
    }, [])

    const { course, setCourse } = useContext(UserContext);
    return (
        <div style={{ marginTop: '120px' }}>
            <h1>Course : {course}</h1>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px',backgroundColor:'skyblue' }}>
                <h2>Course Content</h2>
            </Paper>
        </div>
    )
}

export default Course;