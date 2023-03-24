import React, { useContext } from 'react';
import { useMediaQuery, useTheme, Paper, Container, Typography, makeStyles } from "@material-ui/core";
import texturedImage from "../images/textured_3.png";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { UserContext } from "../UserContext"

// import "./newsCarousel.css";
import image1 from "../images/testimonials/priyanshi_mathur.jpeg";
import image2 from "../images/testimonials/mudit_jain.jpeg";

const useStyles = makeStyles(() => ({
    image: {
        width: "80px",
        height: "80px",
        borderRadius: "30%",
        objectFit: "cover",
        // transform:"rotate(270deg)"
    },
    item: {
        textAlign: "center",
        padding: "25px 0px 0px 50px",
        // transform: "rotate(270deg)",
        // width: "100%",
        // height: "400px",
        // // border: "5px solid red",
        position: "relative",
        // padding:"25px 0px 0px 50px",
        bottom: "10px",
        // left: "30px",
        // // zIndex:"50"
        // // padding:"200px"

    },
    caption: {
        // position: "relative",
        margin: "0 auto",
        left: "150px",
        bottom: "0px",
        // padding: "30px 30px 0px 30px",
        // marginBottom:"20px"
        // transform: "rotate(270deg)",
        // border:"2px solid red",
        // zIndex: ""999
        // height:"400px",
        width: "60%",

    },
    paper: {
        marginTop: "20px",
        height: "100px",
        background: `url(${texturedImage})`,
        boxShadow: "2px 2px 5px 1px blue ,1px 1px 1px 0px blue,1px 1px 2px 0px #eceef4 ",
    },
    text: {
        fontFamily: "Nunito Sans",
        fontWeight: "600",
        fontSize: "15px",
    }
}));

const NewsCarousel = () => {
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { mode } = useContext(UserContext);
    return (
        <div style={{ marginBottom: "30px" }}>
            <Divider
                sx={{
                    "&::before, &::after": {
                        borderTop: "2px solid #fea905",
                    },
                }}
                className={classes.divider}>
                <Chip
                    sx={{
                        background: "linear-gradient(to right bottom,#fea905,orange)"
                    }}
                    label={`NEET ${mode} News`}
                    className={classes.chip}
                />
            </Divider>
            <Paper elevation={5} className={classes.paper}>
                <Carousel style={{ height: "120px", width: "100%", position: "relative", right: "0px", bottom: "5px" }} indicators={true}>
                    <Carousel.Item className={classes.item}>
                        <a href={mode === "PG" ? "https://zeenews.india.com/india/neet-pg-2023-result-released-at-nbe-edu-in-direct-link-steps-to-check-scorecard-cut-off-here-2583609.html" : "https://www.hindustantimes.com/education/competitive-exams/neet-ug-2023-twice-a-year-health-ministry-lok-sabha-latest-news-101679115463611.html"} >
                            <div style={isMobile ? { display: "flex" } : { display: "flex", paddingLeft: "100px" }}>
                                <img
                                    className={classes.image}
                                    src={mode === "PG" ? "https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2023/03/14/1167393-neet-pg-result.jpg" : "https://www.hindustantimes.com/ht-img/img/2023/03/18/400x225/neet-ug-2023_1679117095496_1679117095735_1679117095735.jpg"}
                                    alt="First slide"
                                />

                                <Carousel.Caption className={classes.caption}>
                                    <Typography className={classes.text} variant="body2" gutterBottom style={{ color: "orange", }}>
                                        {mode === "PG" ? "NEET PG 2023 Result RELEASED" : "Will NEET be held twice a year?"}
                                    </Typography>
                                </Carousel.Caption>
                            </div>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item className={classes.item}>
                        <a href={mode === "PG" ? "https://www.indiatoday.in/education-today/news/story/neet-pg-2023-result-20-candidates-score-over-700-this-year-vs-only-1-last-year-result-and-cut-off-comparison-2347574-2023-03-16" : "https://www.jagranjosh.com/articles/neet-ug-2023-nta-clarification-on-st-sc-cut-off-date-get-details-inside-1679039630-1"} >
                            <div style={isMobile ? { display: "flex" } : { display: "flex", paddingLeft: "100px" }}>
                                <img
                                    className={classes.image}
                                    src={mode === "PG" ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202303/national-cancer-institute-nfvdkihxylu-unsplash-sixteen_nine.jpg?VersionId=N4ZmSKPl2LeUfJlGHzjnvRz8kQtEzjhf&size=690:388" : "https://img.jagranjosh.com//images/2023/March/1732023/NEET-UG-2023-UPDATE-(2).webp"}
                                    alt="Second slide"
                                />

                                <Carousel.Caption className={classes.caption}>
                                    <Typography className={classes.text} variant="body2" gutterBottom style={{ color: "orange", }}>
                                        {mode === "PG" ? "NEET PG 2023 Result: 20 candidates score over 700 this year vs only 1 last year | Result and cut-off comparison" : "NEET UG 2023: NTA Clarification On ST, SC Cut Off Date; Get Details Inside"}
                                    </Typography>
                                </Carousel.Caption>
                            </div>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item className={classes.item}>
                        <a href={mode === "PG" ? "https://www.msn.com/en-in/news/newsindia/neet-mds-2023-scorecard-tomorrow-on-natboardeduin-check-key-details-here/ar-AA18OEXc?li=AAgfYGb" : "https://www.livemint.com/news/india/neet-ug-2023-registration-important-dates-application-begins-how-to-do-other-details-11678159399575.html"} >
                            <div style={isMobile ? { display: "flex" } : { display: "flex", paddingLeft: "100px" }}>
                                <img
                                    className={classes.image}
                                    src={mode === "PG" ? "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA18aGoK.img?w=612&h=408&m=6" : "https://images.livemint.com/img/2023/03/07/600x338/Neet_exam__1678159801971_1678159802200_1678159802200.JPG"}
                                    alt="Second slide"
                                />

                                <Carousel.Caption className={classes.caption}>
                                    <Typography className={classes.text} variant="body2" gutterBottom style={{ color: "orange", }}>
                                        {mode === "PG" ? "NEET MDS 2023 Scorecard Tomorrow on natboard.edu.in, Check Key Details Here" : "NEET UG 2023 Registration: Important dates, application begins, how to do, other details"}
                                    </Typography>
                                </Carousel.Caption>
                            </div>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item className={classes.item}>
                        <a href={mode === "PG" ? "https://www.livemint.com/news/india/neetpg-2023-results-announced-today-here-s-how-to-check-11678800203746.html" : "https://economictimes.indiatimes.com/jobs/exams-results/neet-ug-2023-registration-process-starts-soon-on-neet-nta-nic-in-more-details-here/articleshow/98428544.cms?from=mdr"} >
                            <div style={isMobile ? { display: "flex" } : { display: "flex", paddingLeft: "100px" }}>
                                <img
                                    className={classes.image}
                                    src={mode === "PG" ? "https://images.livemint.com/img/2023/03/14/600x338/f138b17e-2f8c-11ed-b360-96b459ca4506_1665392792935_1665392792935_1678800358915_1678800358915.jpg" : "https://img.etimg.com/thumb/msid-98428715,width-300,height-225,imgsize-1277382,,resizemode-75/neet-ug-2023.jpg"}
                                    alt="Second slide"
                                />

                                <Carousel.Caption className={classes.caption}>
                                    <Typography className={classes.text} variant="body2" gutterBottom style={{ color: "orange", }}>
                                        {mode === "PG" ? "NEET-PG 2023 results announced today. Here's how to check:" : "NEET UG 2023: Registration process starts soon on neet.nta.nic.in. More details here"}
                                    </Typography>
                                </Carousel.Caption>
                            </div>
                        </a>
                    </Carousel.Item>
                </Carousel>
            </Paper>
        </div>
    )
}

export default NewsCarousel;