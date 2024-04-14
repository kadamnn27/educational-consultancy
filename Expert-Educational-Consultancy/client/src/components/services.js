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
                    label="Our Services"

                />
            </Divider>
            <div style={{padding: "20px"}}>
                <ul>
                    <li>
                        <Typography className={classes.text}>
                    India's Most Trusted Medical Admission Counsellors with >95% success rate in MBBS admissions
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                            Data Analytics, AI tools to Support Decision Making
                        </Typography>
                    </li>
                    <li>
                        <Typography className={classes.text}>
                            All India presence with 10+ branch offices
                            Over 26 Years of Experience and Leadership
                        </Typography>
                    </li>
                </ul>
                <List sx={{
                    borderRadius: "10px",
                    boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
                }}>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/Expert NEET UG Services 2023 Prashant Vihar.pdf" download>
                            <ListItemText primary="UG Service Brochure" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/Expert NEET PG Services 2023 Prashant Vihar.pdf" download>
                            <ListItemText primary="PG Service Brochure" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/ALL_INDIA_DEEMED_UNIVERSITY_MBBS_FEE_STRUCTURE_2021.xlsx" download>
                            <ListItemText primary="Deemed Universities" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/ALL_INDIA_MBBS_GOVT_FEE_STRUCTURE_2021.xlsx" download>
                            <ListItemText primary="Government Universities" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="../Downloadable_Content/ALL_INDIA_MBBS_PVT_CLG_FEE_STRUCTURE_2021.xlsx" download>
                            <ListItemText primary="Private Universitites" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </Container>
    )
}

export default Services;