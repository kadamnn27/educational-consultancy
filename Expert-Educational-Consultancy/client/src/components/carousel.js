import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles, Typography } from '@material-ui/core';

import image1 from "../images/carousel-images/carousel-image-1.jpg";
import image2 from "../images/carousel-images/carousel-image-2.jpeg";
import image3 from '../images/carousel-images/carousel-image-3.jpg';

const useStyles = makeStyles(() => ({
    image: {
        width: "100%",
        height: "350px",
        objectFit: "cover",
        opacity: 0.4
    },
    item: {
        background: "#090f23",
        height: "350px",
        position: "relative",
        top: "0px"
    },
    carousel: {
        position: "relative",
        bottom: "180px",
        zIndez: 0,
        width: "100%",
    },
    caption: {
        position: "relative",
        // bottom:"200px",
        // right:"100px"
        bottom: "215px",
        left: 0,
        fontFamily: "Nunito Sans",
        fontWeight: "600"
    }
}));

const CarouselComponent = () => {
    const classes = useStyles();
    return (
        <Carousel indicators={false} className={classes.carousel}>
            <Carousel.Item className={classes.item}>
                <img
                    className={classes.image}
                    src={image1}
                    alt="First slide"
                />
                <Carousel.Caption className={classes.caption}>
                    <Typography variant="h4" gutterBottom style={{
                        textShadow: "#000 1px 0 10px",
                        fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>
                        Get the best career guidance
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{
                        textShadow: "#000 1px 0 10px", fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>

                    </Typography>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={classes.item}>
                <img
                    className={classes.image}
                    src={image2}
                    alt="Second slide"
                />

                <Carousel.Caption className={classes.caption}>
                    <Typography variant="h4" gutterBottom style={{
                        textShadow: "#000 1px 0 10px", fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>
                        NEET UG
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{
                        textShadow: "#000 1px 0 10px", fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>
                        India's Most Trusted Medical Admission Counsellors
                        with >95% success rate in MBBS admissions
                    </Typography>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={classes.item}>
                <img
                    className={classes.image}
                    src={image3}
                    alt="Third slide"
                />

                <Carousel.Caption className={classes.caption}>
                    <Typography variant="h4" gutterBottom style={{
                        textShadow: "#000 1px 0 10px", fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>
                        NEET PG
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{
                        textShadow: "#000 1px 0 10px", fontFamily: "Nunito Sans",
                        fontWeight: "600"
                    }}>
                        India's Most Trusted Medical Admission Counsellors
                        with >95% success rate in MD/MS admissions
                    </Typography>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselComponent;