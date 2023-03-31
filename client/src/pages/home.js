import React, { useEffect, useRef, useState, useContext } from "react";
import CarouselComponent from "../components/carousel";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import '../scrollAnimation.css'

import {
  useMediaQuery,
  useTheme,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";

import { Divider, Chip, Paper, Container } from "@mui/material";
import Testimonials from "../components/testimonials";
import NewsCarousel from "../components/newsCarousel";
import Services from "../components/services";

const useStyles = makeStyles((theme) => ({
  btn: {
    fontFamily: "Nunito Sans",
    fontWeight: "600",
    margin: "20px",
    background: "white",
    color: "black",
    borderRadius: "10px",
    transition: "all 0.5s ease",
    border: "2px solid orange",
    "&:hover,&:focus": {
      color: "orange",
      boxShadow:
        "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
      background: "linear-gradient(to right bottom,black,#0411af)",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover,&:focus":
      { color: 'orange' }
  },
  aboutUsSection: {
    marginTop: "15px",
    marginBottom: "15px",
    justifyContent: "space-between",
  },
  modeButton: {
    borderRadius: "10px",
    background: "white",
    color: 'black',
    fontSize: '20px',
    fontWeight: '600',
    transition: "all 0.5s ease",
    border: "1px solid black",
    margin: '25px',
    padding: '7px',
    border: '2px solid orange',
    "&:hover,&:focus": {
      color: 'orange',
      fontSize: '25px',
      fontWeight: '600',
      padding: '3px 5px',
      boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
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
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const [years, setYears] = useState(0);
  const { mode, setMode } = useContext(UserContext);
  useEffect(() => {
    // Years Animation
    let num = -4;
    let totalMilSecDur = 2;
    let incrementTime = (totalMilSecDur / 26) * 1000;
    if (mode) {
      let timer = setInterval(() => {
        num += 1;
        setYears(num);
        var date = new Date();
        if (num === date.getFullYear() - 1996) {
          clearInterval(timer);
        }
      }, incrementTime);
    }

    //Scroll Animation
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
        // else {
        //   entry.target.classList.remove("show");
        // }
        console.log(entry.target.classList);
      });
    });
    const targets = document.querySelectorAll(".scroll");
    targets.forEach(target => {
      // console.log(target);
      observer.observe(target);
    });
  }, [mode]);


  return (
    <div style={isMobile ? { marginTop: "220px" } : {}} width="100%">
      {
        !mode ?
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <div style={{ position: 'relative', bottom: '100px' }}>
              <Typography align="center" variant="h6">Welcome to </Typography>
              <Typography style={{ marginTop: "10px", fontSize: "25px" }} className={classes.logoText}>Expert Educational</Typography>
              <Typography style={{ fontSize: "40px" }} className={classes.logoText}>Consultancy</Typography>
            </div>
            <Typography variant="body1">Pick a mode</Typography>
            <div>
              <button
                class={classes.modeButton}
                onClick={() => { setMode("UG") }}
              >Neet UG</button>
              <button
                class={classes.modeButton}
                onClick={() => { setMode("PG") }}
              >Neet PG</button>
            </div>
          </div>
          :
          <>
            <CarouselComponent />
            <Container style={{ position: "relative", bottom: "100px" }}>
              <div>
                <Divider
                  sx={{
                    "&::before, &::after": {
                      borderTop: "2px solid #fea905",
                    },
                  }}
                  className={classes.divider}
                >
                  <Chip
                    sx={{
                      background: "linear-gradient(to right bottom,#fea905,orange)",
                    }}
                    label="A little about us"
                    className={classes.chip}
                  />
                </Divider>
                <Container
                  className={classes.aboutUsSection}
                  style={
                    !isMobile ? { display: "flex" } : { display: "inline-block" }
                  }
                >
                  <Typography
                    className="scroll scrollLeft"
                    align="left"
                    style={{
                      fontFamily: "Nunito Sans",
                      fontWeight: "600",
                    }}
                    variant="body1"
                  >
                    Expert Educational Consultancy was conceptualised and incorporated
                    in 1995 with a permanent office in Delhi, in response to the
                    growing concerns in MBBS / BDS / BAMS / BHMS / MD / MS /  Diploma / FCPS / CPS
                    admissions in India about fraud, misguidance and cheating by
                    several unscrupulous touts masquerading as admission counsellors.
                    To combat this growing issue and offer complete transparency,
                    Expert Educational Consultancy uses Artificial Intelligence and
                    Data Analytics to help students.
                  </Typography>
                  <Paper
                    className="scroll scrollRight"
                    elevation={3}
                    style={
                      !isMobile
                        ? {
                          width: "120%",
                          height: "100%",
                          margin: "0px 0px 0px 20px",
                          padding: "20px",
                        }
                        : { height: "100px", margin: "30px 0px 30px 0px" }
                    }
                  >
                    <Typography
                      align="center"
                      style={
                        isMobile
                          ? {
                            fontFamily: "Nunito Sans",
                            fontWeight: "600",
                            fontSize: "20px",
                          }
                          : {
                            fontFamily: "Nunito Sans",
                            fontWeight: "600",
                            fontSize: "20px",
                          }
                      }
                      variant="body1"
                    >
                      An Experience of
                      <br />
                      <p
                        style={{
                          color: "#0411af",
                          fontSize: "30px",
                          position: "relative",
                          top: "20px",
                        }}
                      >
                        {years} Years
                      </p>
                    </Typography>
                  </Paper>
                </Container>
              </div>
              <div>
                <Divider
                  sx={{
                    "&::before, &::after": {
                      borderTop: "2px solid #fea905",
                    },
                  }}
                  className={classes.divider}
                >
                  <Chip
                    sx={{
                      background: "linear-gradient(to right bottom,#fea905,orange)",
                    }}
                    label="Our Vision"
                    className={classes.chip}
                  />
                </Divider>
                <Container
                  className={classes.aboutUsSection}
                  style={
                    !isMobile ? { display: "flex" } : { display: "inline-block" }
                  }
                >
                  <Typography
                    align="left"
                    style={{
                      fontFamily: "Nunito Sans",
                      fontWeight: "600",
                    }}
                    variant="body1"
                  >
                    1. To provide guidance to the Medical Students in fulfilling their dreams with pure honesty and dedication.
                    <br />
                    2. To Support Medical aspirants and their Parents in reducing their mental pressure while serving them with a hassle-free admission procedure.
                  </Typography>
                </Container>
                <Divider
                  sx={{
                    "&::before, &::after": {
                      borderTop: "2px solid #fea905",
                    },
                  }}
                  className={classes.divider}
                >
                  <Chip
                    sx={{
                      background: "linear-gradient(to right bottom,#fea905,orange)",
                    }}
                    label="Our Mission"
                    className={classes.chip}
                  />
                </Divider>
                <Container
                  className={classes.aboutUsSection}
                  style={
                    !isMobile ? { display: "flex" } : { display: "inline-block" }
                  }
                >
                  <Typography
                    align="left"
                    style={{
                      fontFamily: "Nunito Sans",
                      fontWeight: "600",
                    }}
                    variant="body1"
                  >
                    Our mission is to be a facilitator helping medical
                    aspirants in obtaining Admission at best medical colleges as per
                    their preference, rank and budget where they can be groomed into
                    the finest doctors which our country desires.
                  </Typography>
                </Container>
              </div>
              <div class="scroll scrollDown">
                <Services />
                <NewsCarousel />
              </div>
              <div class="scroll scrollDown">
                <Divider
                  sx={{
                    "&::before, &::after": {
                      borderTop: "2px solid #fea905",
                    },
                  }}
                  className={classes.divider}
                >
                  <Chip
                    sx={{
                      background: "linear-gradient(to right bottom,#fea905,orange)",
                    }}
                    label="Become a Member"
                    className={classes.chip}
                  />
                </Divider>
                <Typography
                  style={{
                    fontFamily: "Nunito Sans",
                    fontWeight: "600",
                    marginTop: "20px",
                  }}
                  variant="body1"
                  align="center"
                >
                  Become a Member Now To Avail multiple benefits like the ability to
                  download/save jpegs and notes, application details and status
                  personalised guidance and much more. Click on the button below to
                  learn more and become a member
                  <br />
                  <Button
                    className={classes.btn}
                    // href="/register"
                    variant="contained"
                    style={{ padding: "0px" }}
                  >
                    <Link className={classes.link} to="/register" style={{ padding: '5px 10px' }}>
                      Take Membership
                    </Link>
                  </Button>
                </Typography>
                <Testimonials />
              </div>
            </Container>
          </>
      }
    </div>
  );
};

export default Home;
