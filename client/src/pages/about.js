import React, { useEffect, useContext, useState } from 'react';
import { Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { makeStyles, Typography } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from 'prop-types';
import { UserContext } from "../UserContext";

const useStyles = makeStyles(() => ({
    text: {
        fontFamily: "Nunito Sans",
        fontWeight: "600",
        textAlign: "justify",
        textJustify: "inter-word",
    },
}));

const About = ({ navbar, setNavbar }) => {
    const classes = useStyles();
    useEffect(() => {
        setNavbar(true);
    }, [])
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { mode } = useContext(UserContext);
    const [accordionSelected, setAccordionSelected] = useState(false);
    return (
        <Container style={{ margin: "80px auto" }}>
            <Typography align="center" variant="h2" style={{ color: "orange", textShadow: "1px 1px 3px #0411af", marginBottom: "10px", fontFamily: "Nunito Sans", fontWeight: "600", }}>
                EEC - NEET {mode === "UG" ? "UG" : "PG"}
            </Typography>
            {mode === "UG" ?
                <>
                    <Typography className={classes.text} align="center"
                        variant="body1">
                        Expert Educational Consultancy was conceptualised and incorporated in 1995 with a permanent office in Delhi, in response to the growing concerns in MBBS admissions in India about fraud, misguidance and cheating by several unscrupulous touts masquerading as admission counsellors.
                        To combat this growing issue and offer complete transparency, Expert Educational Consultancy uses Artificial Intelligence and Data Analytics to help students.
                        Expert Educational Consultancy started services in 1995 in all professional courses and in 2016 Expert Educational Consultancy launched the personalised counselling services for students/parents. Expert Educational Consultancy laid the foundation of data analysis based specialised and ethical medical admission counselling in India. We are the very first in India to incorporate advanced medical admission data mining and counselling intelligence tools in forecasting the medical admission probability of students on basis of their NEET UG AIR Rank, Domicile, Category and Fees Budget.
                        Unlike traditional generalised heuristics-based admission guidance, NEET UG Expert Educational Consultancy offers highly personalised, data mining and forecasting tools to accurately and ethically guide the students/ parents through the Medical Admission Counselling Process.
                        We proudly claim 90% accuracy on the college prediction model and over 95% client success rate.
                        Expert Educational Consultancy data advisory services are now being used by India’s leading medical admission counselling service providers.
                        Our Mission…
                        is to guide every student in our NEET UG Expert Educational Consultancy family to get an admission in the Best Medical College as per their NEET UG All India Rank, Category, Domicile & Fees Budget in the most ethical, transparent, economic and comfortable way possible.
                        At Our Core -
                        Value for money we strive to offer our services at the most affordable prices so that all students/ parents can avail genuine guidance on medical admission counselling process without any fear of cheating.
                        Integrity, we offer 100% transparent, honest and authentic services to all students/parents. We ensure that there is integrity in our communication, services and activities.
                        Trust, we strive to develop empathy and respect towards each student/ parent and all stakeholders. We work towards enhancing mutual trust between our customers and stakeholders.
                    </Typography>
                </>
                :
                <>

                    <Typography variant="h4" className={classes.text} style={{ color: '#fea905' }}>Our Expert Educational Consultancy</Typography>
                    <Typography className={classes.text} align="center" variant="body1" style={{ marginBottom: '20px' }}>
                        Expert Educational Consultancy one of the leading Medical Admission Counselling Service Provider was established in the year 1995. Our permanent Head Office is situated in North West Delhi supervising more than 10+ branches in all over India. In the last 27 years, we can proudly say that through our assistance approx. 10,500 students have got admission in prestigious government and private colleges of India.               
Our Managing Director, Mr. Shamsher Rana, who has personally visited private medical colleges in 12 states >90% in India which made him one of the best Medical Admission Consultant, with 100% honesty and transparency has every year managed to enrolled >95% of our students in best colleges.
                        <br />
                        <br />

                        Expert Educational Consultancy with data analytics and Artificial Intelligence (AI) tools provide best possible guidance to medical aspirants as per their NEET AIR, Category, Domicile, Budget & their branch preferences. We focus on making the medical admission counselling procedure as simple and transparent as we can, so that the students and their parents do not get confused and puzzled about the admission. We assist from the NEET form filling till the admission, even after admission till the security refund. We make sure that the students should get accurate and appropriate information and notification regarding the counselling procedure on time. We put emphasis to give individual attention on every case that comes to us.
                        The vision of the medical admission guidance EEC in India is to provide accessible and affordable guidance to students seeking admission into top medical colleges in India. Our mission is to simplify the admission process for students and make it stress-free. We aim to provide a one-stop solution for all medical admission needs and be a trusted partner for students and their families in their pursuit of quality medical education. Our goal is to make a positive impact on the lives of students by helping them achieve their dreams and become successful professionals in the medical field.
                        <br />
                        <br />

                        In India, the process of getting admitted to a medical college can be quite competitive and challenging. There are several factors that you need to consider, including your rank in NEET (National Eligibility cum Entrance Test), Domicile, Category, financial capacity to pay fees, branch, availability of seats, etc. which are explained under :
                        <ul style={{listStyleType:'none',marginTop:'10px',position:'relative',right:'10px'}}>
                            <li style={{margin:'5px'}}>
                                <Typography className={classes.text}
                                    style={{ color: 'darkorange', background: '#ffe8b0', padding: '3px 7px', borderRadius: '10px', width: '260px' }} variant="h7">
                                    NEET AIR (All India Rank)
                                </Typography>
                                <Typography style={{margin:'10px'}} className={classes.text} variant="body2">The All India Rank (AIR) is the rank of a candidate in the NEET exam. It is calculated based on the total marks obtained by the candidate in the exam. The higher the rank, the better the chances of getting admission in a good medical college.
                                </Typography>
                            </li>
                            <li style={{margin:'5px'}}>
                                <Typography className={classes.text}
                                    style={{ color: 'darkorange', background: '#ffe8b0', padding: '3px 7px', borderRadius: '10px', width: '100px' }} variant="h7">
                                    Category
                                </Typography>
                                <Typography style={{margin:'10px'}} className={classes.text} variant="body2">The All India Rank (AIR) is the rank of a candidAdmissions guidance for MD/MS/DIPLOMA/DNB courses depend on the category of the student such as General, EWS, OBC, SC, ST, PwD etc. Different State/ institutes have different reservation criteria for each category, and EEC have complete knowledge about the same.
                                </Typography>
                            </li>
                            <li style={{margin:'5px'}}>
                                <Typography className={classes.text}
                                    style={{  color: 'darkorange',background:'#ffe8b0',padding:'3px 7px',borderRadius:'10px',width:'98px'  }} variant="h7">
                                    Domicile
                                </Typography>
                                <Typography style={{margin:'10px'}} className={classes.text} variant="body2">Domicile of the student means where the student lives or have property / ancestral property or have done his/her education. It plays a crucial role in the admission process. Some institutes have different quotas for students of the same state and outside of the state, which EEC have complete information about.
                                </Typography>
                            </li>
                            <li style={{margin:'5px'}}>
                                <Typography className={classes.text}
                                    style={{  color: 'darkorange',background:'#ffe8b0',padding:'3px 7px',borderRadius:'10px',width:'120px'  }} variant="h7">
                                    Tuition Fee
                                </Typography>
                                <Typography style={{margin:'10px'}} className={classes.text} variant="body2">The tuition fee or the financial capacity to pay fees for different branch varies from institute to institute, and the consultancy have updated information about the same to guide the student in the right direction.
                                </Typography>
                            </li>
                            <li style={{margin:'5px'}}>
                                <Typography className={classes.text}
                                    style={{  color: 'darkorange',background:'#ffe8b0',padding:'3px 7px',borderRadius:'10px',width:'77px'  }} variant="h7">
                                    Branch
                                </Typography>
                                <Typography style={{margin:'10px'}} className={classes.text} variant="body2">Government / Private colleges Branch preference as per requirement of the students (recognised / permitted).
                                </Typography>
                            </li>
                        </ul>
                    </Typography>
                    <Typography variant="h4" className={classes.text} style={{ color: '#fea905' }}>Expert Educational Consultancy Admission Counselling Procedure
                    </Typography>
                    <Typography className={classes.text} align="center" variant="body1" style={{ marginBottom: '20px' }}>
                        <ul>
                            <li>
                                Once students come to us, first we do the profiling, if the student is qualified and eligible in certain criteria, only then we take the case.
                            </li>
                            <li>
                                After profiling, our MD Shamsher Rana make personalized report of every student as per their NEET AIR, Category, Domicile, Budget & branch Preference etc.
                            </li>
                            <li>
                                Next, we provide list of documents required at the time of counselling and admission. Also help them in arranging all the documents and resizing them in certain criteria as well as converting the documents in PDF or JPG file as per the requirement.
                            </li>
                            <li>
                                We guide them in filling the form for MCC counselling as well as for state counselling. Then we create the choice filling list considering all their aspects.
                            </li>
                            <li>
                                When the allotment result comes, we help them in taking decision in the following questions:
                                <br />
                                1) Whether to take admission in that college?
                                <br />
                                2) Whether to leave that college?
                                <br />
                                3) Whether to go for upgradation?
                            </li>
                            <li>
                                After the student has taken admission, we check on the security refund process and update them time to time till they get their security deposit refunded.
                            </li>
                        </ul>
                    </Typography>
                    <div className="accordions">
                        <Accordion style={{ margin: '10px', borderRadius: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Q. What differentiates this organization with others?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: 'rgba(135,206,235,0.5)', borderRadius: '10px', margin: '10px' }}>
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    We as a whole team are devoted to provide the best opportunities to our students and in the fastest way possible. We provide personalized report of the college list by profiling every student individually. Most of the consultancies focuses on just admission and their consultancy fee whereas Expert Educational Consultancy aims at providing best possible guidance to the students to get admission based on their NEET AIR & Fee Budget which will lead them to a smooth pathway towards their career goal.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: '10px', borderRadius: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Q. What is the document verification process for various states and how to arrange it?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: 'rgba(135,206,235,0.5)', borderRadius: '10px', margin: '10px' }}>
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    The document verification process for various states differs state to state. It can be online where students must upload original scan documents on the counselling portal or it can be offline where students must go to a nodal center / Institute taking their original documents to verify them.
                                    Expert Educational Consultancy provide the list of documents and all the other information related to the same.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: '10px', borderRadius: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Q. How will I know the admission eligibility criteria of each state?                        </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: 'rgba(135,206,235,0.5)', borderRadius: '10px', margin: '10px' }}>
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Students can get knowledge about the admission eligibility criteria of each state from the Information Bulletin provided at the MCC/State counselling website. But taking knowledge for all state’s eligibility criteria is too time consuming and is not enough to get admission. Even after going through this information bulletin, you will be having some queries which can only be sought out by a counsellor or a consultancy.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: '10px', borderRadius: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Q. How to fill up the application forms of various states and deemed universities?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: 'rgba(135,206,235,0.5)', borderRadius: '10px', margin: '10px' }}>
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Our team will guide you through Any Desk App to fill up the application forms for various states and deemed universities.

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ margin: '10px', borderRadius: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Q. How will I get the latest updates on the admission process?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ background: 'rgba(135,206,235,0.5)', borderRadius: '10px', margin: '10px' }}>
                                <Typography
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontWeight: "600",
                                    }}
                                >
                                    Our team will be continuously in contact with you through whatsapp, sms, email, webinar and phone to keep you updated about all the information regarding counselling and admission.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </>
            }
        </Container>
    )
}

export default About;
