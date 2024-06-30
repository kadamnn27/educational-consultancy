import React from 'react';
import { makeStyles, useMediaQuery, useTheme, Container, Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles(() => ({
    text: {
        fontFamily: "Nunito Sans",
        fontWeight: "600",
    }
}));

const Services = () => {
    const classes = useStyles();
    return (
        <Container>
            <Divider
                sx={{
                    "&::before, &::after": {
                        borderTop: "2px solid #fea905",
                    },
                }}
            >
                <Chip
                    sx={{
                        background: "linear-gradient(to right bottom,#fea905,orange)"
                    }}
                    label="Why choose us?"

                />
            </Divider>
            <div style={{padding: "20px"}}>
                <ul>
                    <li>
                        <Typography className={classes.text}>
                        Over 28 years, India’s Most Trusted Admission Consultancy with >96% success rate in MBBS / BDS / BAMS /
                        BHMS admission.
                    
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Utilize Data Analytics and AI tools to support in decision making.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        All India Presence with over 10+ branches across the country.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Private & Deemed Colleges in 15 states are Personally Visited (Approx. 95%)
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Dedicated and Professionally Trained Employees.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Provide information on document preparation, form filling, eligibility, fee structure, bond, college -
                        apprvd./Recog., no. of seats, security amount.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        We provide accurate & authentic information with 100% honesty and transparency.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Provide individual attention to each case.
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                        Focus on strong follow-ups & time to time updates.
                        </Typography>
                    </li>
                
                </ul>
                <List sx={{
                    borderRadius: "10px",
                    boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
                }}>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/EXPERT_NEET_UG_SERVICES_2024.pdf" download>
                            <ListItemText primary="UG Service Brochure" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/EXPERT_NEET_PG_SERVICES_2024.pdf" download>
                            <ListItemText primary="PG Service Brochure" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/ALL_INDIA_MBBS_COLLEGE_LIST_2024.xlsx" download>
                            <ListItemText primary="MBBS College List" />
                        </ListItemButton>
                    </ListItem>
                    {/*<ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/ALL_INDIA_MBBS_GOVT_FEE_STRUCTURE_2021.xlsx" download>
                            <ListItemText primary="Government Universities" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/ALL_INDIA_MBBS_PVT_CLG_FEE_STRUCTURE_2021.xlsx" download>
                            <ListItemText primary="Private Universitites" />
                        </ListItemButton>
                    </ListItem>*/}
                </List>
            </div>
        </Container>
    )
}

export default Services;