import React, { useEffect, useState } from 'react';
import { Grow, Box, Grid, makeStyles, CssBaseline, Typography } from '@material-ui/core';
import { Paper, RadioGroup, FormControlLabel, Radio, MenuItem, TextField, Alert, Button, Stack, CircularProgress, Stepper, Step, StepLabel } from '@mui/material';
import CalendarIcon from '../images/icons/calendar-line-icon.svg';
import defaultAvatar from '../images/icons/Default-Avatar.png';

import axios from '../api/axios';

const REGISTERATION_URL = '/api/v1/register';

const useStyles = makeStyles(() => ({
    form: {
        width: "100%",
        padding: '10px',
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        background: "white",
    }
}));

const Register = ({ navbar, setNavbar }) => {
    const classes = useStyles();

    useEffect(() => {
        setNavbar(true);
    }, [])

    //make an array of all indian states

    const states = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"]

    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("female");
    const [dob, setDob] = useState("2000-05-01");
    const [neet, setNeet] = useState({
        score: null,
        airRank: null,
        categoryRank: null
    });
    const [state, setState] = useState({
        domicile: "",
        passedTenth: "",
        passedEleventh: "",
        passedTwelfth: "",
        passedGrad: ""
    });
    const [isPwd, setPwd] = useState(false);
    const [occParent, setoccParent] = useState({ fatherOccupation: "Select or Write", motherOccupation: "Select or Write" });
    const [quota, setQuota] = useState(null);
    const [feeBudget, setFeeBudget] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [category, setCategory] = useState(null);

    const [failiure, setFailiure] = useState(false);
    const [failiureMessage, setFailiureMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [responseRecieved, setResponseRecieved] = useState(false);

    const steps = [
        {
            label: 'Profile Picture',
        },
        {
            label: 'Personal Details',
        },
        {
            label: 'NEET Details',
        },
        {
            label: 'Additional Info',
        }
    ];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 0;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        if (course === "FCPS/CPS" || course === "DNB" || course === "MD/MS")
            setState({ ...state, passedTenth: 0, passedEleventh: 0, passedTwelfth: 0 })
        else setState({ ...state, passedGrad: 0 });
    }, [course])

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setResponseRecieved(true);
        setSuccess(false);
        setFailiure(false);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phoneno', phoneNo);
            formData.append('course', course);
            formData.append('city', city);
            formData.append('image', image); // `image` should be a file object, such as from an `<input type="file">` field
            formData.append('gender', gender);
            formData.append('dob', dob);
            formData.append('neet', JSON.stringify(neet));
            formData.append('state', JSON.stringify(state));
            formData.append('isPwd', isPwd);
            formData.append('occParent', JSON.stringify(occParent));
            formData.append('quota', quota);
            formData.append('feeBudget', feeBudget);
            formData.append('category', category);
            const response = await axios.post(REGISTERATION_URL,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )
            console.log(response);
            setResponseRecieved(false);
            setSuccess(true);
        } catch (error) {
            setFailiureMessage(error.response.data.msg);
            setFailiure(true);
            setResponseRecieved(false);
        }
    }

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            style={{ margin: '100px 25px' }}
        >
            <Paper elevation={5} sx={{ maxWidth: '700px', borderRadius: '20px', margin: 'auto' }}>
                <Typography style={{
                    padding: '20px',
                    borderRadius: "20px 20px 0px 0px",
                    background: '#1769aa',
                    color: 'white',
                    fontFamily: "Nunito Sans",
                    fontWeight: "800",
                }} variant="h3" align="center">
                    Register
                </Typography>
                <div style={{ padding: "5px" }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={step.label} {...stepProps}>
                                    <StepLabel {...labelProps}>{step.label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            {
                                responseRecieved ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: '20px' }}>
                                        <Typography style={{ color: 'black', marginRight: '10px' }}>Registering User</Typography>
                                        <CircularProgress style={{ color: "#1769aa" }} />
                                    </div>
                                    :
                                    <>
                                        {
                                            failiure ? (
                                                <Grow in timeout={500}>
                                                    <Stack sx={{ width: '100%' }}>
                                                        <Alert
                                                            severity="error"
                                                            action={
                                                                <Button href="/" color="inherit" size="small">
                                                                    Home
                                                                </Button>
                                                            }
                                                        >
                                                            {failiureMessage}
                                                        </Alert>
                                                    </Stack>
                                                </Grow>
                                            ) : success ? (
                                                <Grow in timeout={500}>
                                                    <Stack sx={{ width: '100%' }}>
                                                        <Alert
                                                            action={
                                                                <Button href="/" color="inherit" size="small">
                                                                    Home
                                                                </Button>
                                                            }
                                                        >
                                                            Registeration Successful. Our team will soon reach out to you. Click on the button to go back to home page
                                                        </Alert>
                                                    </Stack>
                                                </Grow>
                                            ) : null
                                        }
                                    </>
                            }
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button disabled={responseRecieved} onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box style={{ padding: '10px' }}>
                                {
                                    activeStep === 0 ? (
                                        <>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography variant="h6" style={{ margin: '20px' }}>Choose a Profile Picture</Typography>
                                                {
                                                    image ?
                                                        <img src={imageURL} alt="Upload a Photo" style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
                                                        :
                                                        <img src={defaultAvatar} alt="profile" style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
                                                }
                                            </div>
                                            <div style={{ margin: '20px 0px 0px 10px', display: 'flex', justifyContent: 'center' }}>
                                                <input
                                                    hidden
                                                    id="avatar"
                                                    type="file"
                                                    accepts="image/*"
                                                    name="image"
                                                    onChange={(event) => {
                                                        setImageURL(URL.createObjectURL(event.target.files[0]));
                                                        setImage(event.target.files[0]);
                                                    }}
                                                />
                                                <label for="avatar" style={{ margin: '10px', fontFamily: 'Nunito Sans', fontWeight: '600', padding: '10px 17px' }}>UPLOAD PHOTO</label>
                                                <Button
                                                    // variant="contained"
                                                    onClick={() => {
                                                        setImage(null);
                                                        setImageURL(null);
                                                    }}
                                                    sx={{
                                                        fontFamily: "Nunito Sans",
                                                        fontWeight: "600",
                                                        margin: '10px',
                                                        padding: "8px 14px",
                                                        background: "white",
                                                        color: "black",
                                                        borderRadius: "10px",
                                                        transition: "all 0.5s ease",
                                                        border: "2px solid orange",
                                                        "&:hover,&:focus": {
                                                            boxShadow: "0px 0px 6px 2.5px #fea905 ,1px 1px 1px 0px #ECDE65,1px 1px 1px 0px #ECDE65",
                                                            color: "#fea905",
                                                            background: "linear-gradient(to right bottom,black,#0411af)"
                                                        }
                                                    }}
                                                > Remove Photo </Button>
                                            </div>
                                        </>
                                    ) :
                                        activeStep === 1 ? (
                                            <>
                                                <TextField name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ margin: '15px' }} id="outlined-basic" label="Name" variant="outlined" />
                                                <TextField name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin: '15px' }} id="outlined-basic" label="Email" variant="outlined" />
                                                <TextField name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ margin: '15px', marginBottom: '20px' }} id="outlined-basic" label="Password" variant="outlined" />
                                                <TextField name="city" value={city} onChange={(e) => setCity(e.target.value)} style={{ margin: '15px' }} id="outlined-basic" label="City" variant="outlined" />
                                                <TextField type="number" name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} style={{ margin: '15px' }} id="outlined-basic" label="Phone Number" variant="outlined" />
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography style={{ margin: '15px' }}>Select your Gender</Typography>
                                                    <RadioGroup
                                                        aria-labelledby="gender-radio-buttons-group-label"
                                                        defaultValue={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        name="gender"
                                                        style={{ display: 'flex', flexDirection: 'row' }}
                                                    >
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography style={{ margin: '15px' }}>Select your DOB : </Typography>
                                                    <div style={{ display: 'flex' }}>
                                                        <input name="dob" style={{ background: 'transparent', border: '1px dashed orange', color: 'darkorange', fontWeight: "600", fontSize: '20px', padding: '10px' }} type="date" label="DOB" value={dob} onChange={(e) => setDob(e.target.value)} id="dob" />
                                                        <img width="15px" style={{ position: 'relative', right: '25px', bottom: '2px' }} src={CalendarIcon} />
                                                    </div>
                                                </div>
                                            </>
                                        ) : activeStep === 2 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>

                                                <TextField type="number" value={neet.score} onChange={(e) => setNeet({ ...neet, score: e.target.value })} style={{ margin: '15px' }} label="NEET Score" variant="outlined" id="outlined-basic"/>
                                                <TextField type="number" value={neet.airRank} onChange={(e) => setNeet({ ...neet, airRank: e.target.value })} style={{ margin: '15px' }} label="AIR Rank" variant="outlined" id="outlined-basic"/>
                                                <TextField type="number" value={neet.categoryRank} onChange={(e) => setNeet({ ...neet, categoryRank: e.target.value })} style={{ margin: '15px' }} label="Category Rank" variant="outlined" id="outlined-basic"/>
                                                <TextField
                                                    select
                                                    variant={course ? "filled" : "standard"}
                                                    helperText="Enter the course you are interested in"
                                                    style={{ margin: '15px' }}
                                                    label="Course"
                                                    value={course}
                                                    name="course"
                                                    onChange={(e) => setCourse(e.target.value)}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="MBBS">MBBS</MenuItem>
                                                    <MenuItem value="BAMS">BAMS</MenuItem>
                                                    <MenuItem value="BHMS">BHMS</MenuItem>
                                                    <MenuItem value="BDS">BDS</MenuItem>
                                                    <MenuItem value="MD/MS">MD/MS</MenuItem>
                                                    <MenuItem value="DNB">DNB</MenuItem>
                                                    <MenuItem value="FCPS/CPS">FCPS/CPS</MenuItem>
                                                </TextField>
                                                <TextField
                                                    select
                                                    variant={state.domicile ? "filled" : "standard"}
                                                    helperText="Enter the state you are domicile in"
                                                    style={{ margin: '15px 60px 15px 15px' }}
                                                    label="Domicile State"
                                                    value={state.domicile}
                                                    name="domicile"
                                                    onChange={(e) => setState({ ...state, domicile: e.target.value })}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {states.map(state => (
                                                        <MenuItem value={state}>
                                                            {state}
                                                        </MenuItem>
                                                    )
                                                    )}
                                                </TextField>
                                                {course === "MD/MS" || course === "DNB" || course === "FCPS/CPS" ?
                                                    <>
                                                        <TextField
                                                            select
                                                            variant={state.passedGrad ? "filled" : "standard"}
                                                            helperText="Enter the state you did your graduation from"
                                                            style={{ margin: '15px' }}
                                                            label="Graduation State"
                                                            value={state.passedGrad}
                                                            name="passedGrad"
                                                            onChange={(e) => setState({ ...state, passedGrad: e.target.value })}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {states.map(state => (
                                                                <MenuItem value={state}>
                                                                    {state}
                                                                </MenuItem>
                                                            )
                                                            )}
                                                        </TextField>
                                                    </> :
                                                    <>
                                                        <TextField
                                                            select
                                                            variant={state.passedTenth ? "filled" : "standard"}
                                                            helperText="Enter the state you passed your 10th from"
                                                            style={{ margin: '15px' }}
                                                            label="Tenth State"
                                                            value={state.passedTenth}
                                                            name="passedTenth"
                                                            onChange={(e) => setState({ ...state, passedTenth: e.target.value })}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {states.map(state => (
                                                                <MenuItem value={state}>
                                                                    {state}
                                                                </MenuItem>
                                                            )
                                                            )}
                                                        </TextField>
                                                        <TextField
                                                            select
                                                            variant={state.passedEleventh ? "filled" : "standard"}
                                                            helperText="Enter the state you passed your 11th from"
                                                            style={{ margin: '15px' }}
                                                            label="Eleventh State"
                                                            name="passedEleventh"
                                                            value={state.passedEleventh}
                                                            onChange={(e) => setState({ ...state, passedEleventh: e.target.value })}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {states.map(state => (
                                                                <MenuItem value={state}>
                                                                    {state}
                                                                </MenuItem>
                                                            )
                                                            )}
                                                        </TextField>
                                                        <TextField
                                                            select
                                                            variant={state.passedTwelfth ? "filled" : "standard"}
                                                            helperText="Enter the state you passed your 12th from"
                                                            style={{ margin: '15px' }}
                                                            label="Twelfth State"
                                                            value={state.passedTwelfth}
                                                            name="passedTwelfth"
                                                            onChange={(e) => setState({ ...state, passedTwelfth: e.target.value })}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {states.map(state => (
                                                                <MenuItem value={state}>
                                                                    {state}
                                                                </MenuItem>
                                                            )
                                                            )}
                                                        </TextField>
                                                    </>
                                                }
                                            </div>
                                        ) : activeStep === 3 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', maxWidth: '500px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography style={{ margin: '20px' }}>Are you a person with disablilties?</Typography>
                                                    <RadioGroup
                                                        aria-labelledby="pwd-radio-buttons-group-label"
                                                        defaultValue={isPwd}
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        name="pwd"
                                                    >
                                                        <div>
                                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <TextField
                                                    select
                                                    variant={quota ? "filled" : "standard"}
                                                    helperText="Select Quota"
                                                    style={{ margin: '15px' }}
                                                    label="Quota"
                                                    value={quota}
                                                    name="quota"
                                                    onChange={(e) => setQuota(e.target.value)}
                                                >
                                                    <MenuItem value="General">General</MenuItem>
                                                    <MenuItem value="SC">SC</MenuItem>
                                                    <MenuItem value="ST">ST</MenuItem>
                                                    <MenuItem value="OBC-Central">OBC - Central</MenuItem>
                                                    <MenuItem value="OBC-State">OBC - State</MenuItem>
                                                    <MenuItem value="EWS">EWS</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </TextField>
                                                <TextField
                                                    select
                                                    variant={category ? "filled" : "standard"}
                                                    helperText="Select Category"
                                                    style={{ margin: '15px' }}
                                                    label="Category"
                                                    value={category}
                                                    name="category"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <MenuItem value="central">Central</MenuItem>
                                                    <MenuItem value="state">State</MenuItem>
                                                </TextField>
                                                <TextField type="number" style={{ margin: '15px' }} value={feeBudget} onChange={(e) => setFeeBudget(e.target.value)} label="Annual Fee Budget (INR)" variant="outlined" id="outlined-basic"/>
                                                <div style={{ margin: '15px' }}>
                                                    <Typography variant="h6">Parent's Occupation</Typography>
                                                    <TextField
                                                        select={occParent.motherOccupation === "Select or Write" || occParent.motherOccupation === "ESI" || occParent.motherOccupation === "Defence" || occParent.motherOccupation === "Paramilitary" || occParent.motherOccupation === "Judiciary" || occParent.motherOccupation === "Housewife" || occParent.motherOccupation === "Doctor" || occParent.motherOccupation === "Teacher"}
                                                        variant={occParent.motherOccupation ? "filled" : "standard"}
                                                        helperText="Enter Mother's occupation"
                                                        value={occParent.motherOccupation}
                                                        onChange={(e) => setoccParent({ ...occParent, motherOccupation: e.target.value })}
                                                        style={{ margin: '15px', width: '200px' }}
                                                        id="outlined-basic"
                                                        name="motherOccupation"
                                                        label="Mother's occupation"
                                                    >
                                                        <MenuItem value="ESI">ESI</MenuItem>
                                                        <MenuItem value="Defence">Defence</MenuItem>
                                                        <MenuItem value="Paramilitary">Paramilitary</MenuItem>
                                                        <MenuItem value="Judiciary">Judiciary</MenuItem>
                                                        <MenuItem value="Housewife">Housewife</MenuItem>
                                                        <MenuItem value="Doctor">Doctor</MenuItem>
                                                        <MenuItem value="Teacher">Teacher</MenuItem>
                                                        <MenuItem value="Other">Other</MenuItem>
                                                    </TextField>
                                                    <TextField
                                                        select={occParent.fatherOccupation === "Select or Write" || occParent.fatherOccupation === "ESI" || occParent.fatherOccupation === "Defence" || occParent.fatherOccupation === "Paramilitary" || occParent.fatherOccupation === "Judiciary" || occParent.fatherOccupation === "Businessman" || occParent.fatherOccupation === "Doctor" || occParent.fatherOccupation === "Teacher"}
                                                        helperText="Enter Father's occupation"
                                                        value={occParent.fatherOccupation}
                                                        variant={occParent.fatherOccupation ? "filled" : "standard"}
                                                        onChange={(e) => setoccParent({ ...occParent, fatherOccupation: e.target.value })}
                                                        style={{ margin: '15px', width: '200px' }}
                                                        id="outlined-basic"
                                                        name="fatherOccupation"
                                                        label="Father's occupation"
                                                    >
                                                        <MenuItem value="ESI">ESI</MenuItem>
                                                        <MenuItem value="Defence">Defence</MenuItem>
                                                        <MenuItem value="Paramilitary">Paramilitary</MenuItem>
                                                        <MenuItem value="Judiciary">Judiciary</MenuItem>
                                                        <MenuItem value="Businessman">Businessman</MenuItem>
                                                        <MenuItem value="Doctor">Doctor</MenuItem>
                                                        <MenuItem value="Teacher">Teacher</MenuItem>
                                                        <MenuItem value="Other">Other</MenuItem>
                                                    </TextField>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && !image && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}
                                {
                                    activeStep === 0 ?
                                        <Button
                                            onClick={handleNext}
                                            disabled={!image}
                                        >
                                            Next
                                        </Button>
                                        : activeStep === 1 ?
                                            <Button
                                                onClick={handleNext}
                                                disabled={!(name && email && password && city && phoneNo && gender)}
                                            >
                                                Next
                                            </Button> : activeStep === 2 ?
                                                <Button
                                                    onClick={handleNext}
                                                    disabled={!(course && neet.score && neet.airRank && neet.categoryRank && state.domicile && (((["DNB", "MD/MS", "FCPS/CPS"]).includes(course) && state.passedGrad !== 0) || (!((["DNB", "MD/MS", "FCPS/CPS"]).includes(course)) && state.passedTenth !== 0 && state.passedEleventh!==0 && state.passedTwelfth!==0)))}
                                                >
                                                    Next
                                                </Button> : activeStep === 3 ? <Button
                                                    onClick={() => {
                                                        handleNext();
                                                        handleSubmit();
                                                    }}
                                                    disabled={!(quota && feeBudget && category && occParent.motherOccupation && occParent.fatherOccupation)}
                                                >
                                                    Sign Up
                                                </Button> : null
                                }
                            </Box>
                        </React.Fragment>
                    )}
                </div>
            </Paper>
        </Box>
    )
}

export default Register;