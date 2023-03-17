import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import { Paper,Divider, Chip } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from '@mui/material/CircularProgress';

import texturedImage from "../images/textured_3.png";
import axios from '../api/axios';
import { UserContext } from '../UserContext';

const useStyles = makeStyles((theme) => ({
    testimonialsBtn: {
        fontFamily: "Nunito Sans",
        fontWeight: "600",
        margin: "20px",
        padding: "10px",
        textDecoration: "none",
        backgroundColor: "white",
        color: "black",
        borderRadius: "10px",
        transition: "all 0.5s ease",
        border: "2px solid orange",
        "&:hover,&:focus": {
            boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
            color: "orange",
            background: "linear-gradient(to right bottom,black,#0411af)"
        }
    },
    image: {

        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        opacity: 1,
        display: "inline-block"
    },
    item: {
        textAlign: "center",
        opacity: 1,
        padding: "20px 0px 20px 0px",
    },
    caption: {
        position: "relative",
        left: "0px",
        top: "10px",
        padding: "0px 40px 0px 40px",
    },
    paper: {
        marginTop: "20px",
        background: `url(${texturedImage})`,
        boxShadow: "2px 2px 5px 1px blue ,1px 1px 1px 0px blue,1px 1px 2px 0px #eceef4 ",
    },
    text: {
        fontFamily: "Nunito Sans",
        fontWeight: "600"
    }
}));

const Testimonials = () => {
    const classes = useStyles();
    const testimonialsURL = '/api/v1/testimonials';
    const [testimonials, setTestimonials] = useState([]);
    const { mode } = useContext(UserContext);
    useEffect(() => {
        setTestimonials([]);
        axios.get(testimonialsURL)
            .then((response) => {
                setTestimonials(response.data.testimonials.filter(testimonial => testimonial.type === mode));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [mode])
    return (
        <div>
            <Divider
                sx={{
                    marginTop: "20px",
                    marginBottom: "40px",
                    "&::before, &::after": {
                        borderTop: "2px solid #fea905",
                    },
                }}
                className={classes.divider}>
                <Chip
                    sx={{
                        background: "linear-gradient(to right bottom,orange,#fea905)"
                    }}
                    label={`Our ${mode} Testimonials`}
                    className={classes.chip}
                />
            </Divider>
            <Paper elevation={5} className={classes.paper}>
                {
                    testimonials.length > 0 ?
                        <Carousel indicators={true} style={{ paddingBottom: '20px' }}>
                            {
                                testimonials.map((testimonial, index) => (
                                    <Carousel.Item key={index} className={classes.item}>
                                        <img
                                            className={classes.image}
                                            src={testimonial.image.secure_url}
                                            alt="User Image"
                                        />
                                        <Carousel.Caption className={classes.caption}>
                                            <Typography className={classes.text} variant="h4" gutterBottom style={{ color: "orange", }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography className={classes.text} variant="h6" gutterBottom style={{ color: "orange", }}>
                                                {testimonial.course}
                                            </Typography>
                                            <Typography className={classes.text} variant="body2" gutterBottom style={{ color: "orange", }}>
                                                {testimonial.content}
                                            </Typography>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                        :
                        <Typography align="center">
                            <CircularProgress style={{ color: "white", margin: '20px' }} />
                        </Typography>
                }
            </Paper>
            <Typography align="center">
                <br />
                <Link className={classes.testimonialsBtn} to="/faq" variant="contained">Some Frequently Asked Questions</Link>
            </Typography>
        </div>
    )
}

export default Testimonials;