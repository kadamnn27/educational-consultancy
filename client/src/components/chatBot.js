import React from 'react';
import { Popover,Button } from '@mui/material';
import ChatBot from 'react-simple-chatbot';
import ChatBotImage from '../images/chatbot.png';
import { ThemeProvider } from 'styled-components';

const ChatBotComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const steps = [
        {
            id: '0',
            message: 'Welcome to Expert Educational Consultancy ! How may i assist you today?',
            trigger: '1',
        },
        {
            id: '1',
            message: 'What is your name ?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: 'Hi {previousValue}, select UG or PG !',
            trigger: 'gradOption',
        },
        {
            id: 'gradOption',
            options: [
                { value: 'UG', label: 'UG', trigger: 'UG:Q1' },
                { value: 'PG', label: 'PG', end: true },
            ],
        },
        {
            id: 'UG:Q1',
            options: [
                { value: 'What is the age limit for NEET UG 2022?', label: 'What is the age limit for NEET UG 2022?', trigger: 'UG:Ans1' },
                { value: 'What is minimum & maximum age limit for NEET UG 2022?', label: 'What is minimum & maximum age limit for NEET UG 2022?', trigger: 'UG:Ans1' },
                { value: 'Is there any age limit for MBBS in India?', label: 'Is there any age limit for MBBS in India?', trigger: 'UG:Ans1' },
                { value: 'Has NMC removed the upper age limit for MBBS in India?', label: 'Has NMC removed the upper age limit for MBBS in India?', trigger: 'UG:Ans1' },
                { value: 'What is the minimum age limit for MBBS in India?', label: 'What is the minimum age limit for MBBS in India?', trigger: 'UG:Ans1' },
                { value: 'What is the maximum age limit for MBBS in India?', label: 'What is the maximum age limit for MBBS in India?', trigger: 'UG:Ans1' },
                { value: 'Is there any age limit for BDS in India?', label: 'Is there any age limit for BDS in India?', trigger: 'UG:Ans1' },
                { value: 'Has NMC removed the upper age limit for BDS in India?', label: 'Has NMC removed the upper age limit for BDS in India?', trigger: 'UG:Ans1' },
                { value: 'What is the minimum age limit for BDS in India?', label: 'What is the minimum age limit for BDS in India?', trigger: 'UG:Ans1' },
                { value: 'What is the maximum age limit for BDS in India?', label: 'What is the maximum age limit for BDS in India?', trigger: 'UG:Ans1' },
            ],
        },
        {
            id: 'UG:Ans1',
            message: 'According to NMC & DCI, lower age limit – 17 years on or before 31 December of the year of admission or they have been born on or before 31/12/2005. On meeting held on 21 October 2021, NMC has decided that there should be NO age Limit.',
            trigger: 'UG:Q2'
        },
        {
            id: 'UG:Q2',
            options: [
                { value: 'How many Rounds are in Counselling?', label: 'How many Rounds are in Counselling?', trigger: 'UG:Ans2' },
                { value: 'How many Rounds are in MCC Counselling?', label: 'How many Rounds are in MCC Counselling?', trigger: 'UG:Ans2' },
                { value: 'How many Rounds are in State Counselling?', label: 'How many Rounds are in State Counselling?', trigger: 'UG:Ans2' },
            ]
        },
        {
            id: 'UG:Ans2',
            message: '4 Rounds. Round 1, Round 2, MOPUP Round, Stray Round. ',
            trigger: 'UG:Q3'
        },
        {
            id: 'UG:Q3',
            options: [
                { value: 'How many Institutes Participate in MCC?', label: 'How many Institutes Participate in MCC?', trigger: 'UG:Ans3' },
            ]
        },
        {
            id: 'UG:Ans3',
            message: 'All India Quota (15%), Deemed Universities, Central Universities (Delhi University, Jamia Milia Islamia, Central Universities under MoHFW-VMMC & SJH, ABVIMS& RML, ESIC Dental), Aligarh Muslim University, Banaras Hindu University, AIIMS, JIPMER, AFMC.',
            trigger: 'UG:Q4'
        },
        {
            id: 'UG:Q4',
            options: [
                { value: 'How much fees I have to spend on MCC Counselling?', label: 'How much fees I have to spend on MCC Counselling?', trigger: 'UG:Ans4' },
                { value: 'What is the Registration and Counselling fee in MCC for MBBS?', label: 'What is the Registration and Counselling fee in MCC for MBBS?', trigger: 'UG:Ans4' },
            ]
        },
        {
            id: 'UG:Ans4',
            message: 'For Deemed Universities: Non- Refundable Registration fee: -Rs. 5000 / - (same for all candidates). Refundable Security amount: -Rs. 2, 00, 000 / - e.g.Any candidate opting for Deemed University will have to pay Rs 5000 / - Non - Refundable fee + Rs 2, 00, 000 / - Refundable security amount at the time of at the time of Registration. For Govt.Universities: Non - Refundable Registration fee: -Rs. 1000 / - for UR candidates & Rs. 500 / - For SC / ST / OBC / PH candidates.Refundable security amount: - Rs.10, 000 / - for UR candidates & Rs. 5, 000 / - for SC / ST / OBC / PH e.g., any UR candidate opting for Central Universities / AFMC / ESI will pay Rs. 1000 / -+ Rs. 10, 000 = Rs. 11, 000 at the time of registration.Any SC / ST / OBC / PH candidate will pay Rs. 500 + Rs.5, 000 = Rs. 5, 500 at the time of registration.',
            trigger: 'UG:Q5'
        },
        {
            id: 'UG:Q5',
            options: [
                { value: 'How much fee I have to pay in Deemed University Counselling?', label: 'How much fee I have to pay in Deemed University Counselling?', trigger: 'UG:Ans5' },
            ]
        },
        {
            id: 'UG:Ans5',
            message: 'Non-Refundable Registration fee: -Rs. 5000/- (same for all candidates). Refundable Security amount: -Rs. 2, 00,000/- e.g. Any candidate opting for Deemed University will have to pay Rs 5000/- Non-Refundable fee + Rs 2,00,000/- Refundable security amount at the time of at the time of Registration.',
            trigger:'UG:Q6',
        },
        {
            id: 'UG:Q6',
            options: [
                { value: 'How much fee I have to pay in Govt. University Counselling?', label: 'How much fee I have to pay in Govt. University Counselling?', trigger: 'UG:Ans6' },
            ]
        },
        {
            id: 'UG:Ans6',
            message: 'Non-Refundable Registration fee: -Rs. 1000/- for UR candidates & Rs. 500/- For SC/ ST/ OBC/ PH candidates. Refundable security amount: - Rs.10,000/- for UR candidates &Rs. 5,000/- for SC/ST/OBC/PH e.g., any UR candidate opting for Central Universities/ AFMC/ ESI will pay Rs. 1000/-+ Rs. 10,000= Rs. 11,000 at the time of registration. Any SC/ST/OBC/PH candidate will pay Rs. 500 + Rs.5,000 = Rs. 5,500 at the time of registration.',
            trigger:'UG:Q7',
        },
        {
            id: 'UG:Q7',
            options: [
                { value: 'If I have to opt for Govt. & Deemed University both. Do I have to pay the registration fee & security fee for both?', label: 'If I have to opt for Govt. & Deemed University both. Do I have to pay the registration fee & security fee for both?', trigger: 'UG:Ans7' },
            ]
        },
        {
            id: 'UG:Ans7',
            message: 'No. As per the policy, the candidate has to pay only the higher fee. In this case the candidate will have to pay fee for Deemed University i.e., Rs. 5000/- (counselling/registration) plus Rs. 2,00,000/- (security amount).',
            trigger:'UG:Q8',
        },
        {
            id: 'UG:Q8',
            options: [
                { value: 'When & Where the Security Deposit will be refunded?', label: 'When & Where the Security Deposit will be refunded?', trigger: 'UG:Ans8' },
            ]
        },
        {
            id: 'UG:Ans8',
            message: 'Refund process starts after 2 months of counselling finish. It will be refunded in the same account from which you have done the payment.',
            trigger:'UG:Q9',
        },
        {
            id: 'UG:Q9',
            options: [
                { value: 'If I got a seat in MBBS in Round 1 of MCC Counselling and I don’t want to join that college. Can I leave it without forfeited my security deposit?', label: 'If I got a seat in MBBS in Round 1 of MCC Counselling and I don’t want to join that college. Can I leave it without forfeited my security deposit?', trigger: 'UG:Ans9' },
            ]
        },
        {
            id: 'UG:Ans9',
            message: 'Yes. The first Round is Free Exit',
            trigger:'UG:Q10',
        },
        {
            id: 'UG:Q10',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans10',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q11'
        },
        {
            id: 'UG:Q11',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans11',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q12'
        },{
            id: 'UG:Q12',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans12',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q13'
        },{
            id: 'UG:Q13',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans13',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q14'
        },{
            id: 'UG:Q14',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans14',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q15'
        },{
            id: 'UG:Q15',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans15',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q16'
        },{
            id: 'UG:Q16',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans16',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q17'
        },{
            id: 'UG:Q17',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans17',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q18'
        },{
            id: 'UG:Q18',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans18',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q19'
        },{
            id: 'UG:Q19',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans19',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            trigger:'UG:Q20'
        },{
            id: 'UG:Q20',
            options: [
                { value: 'What is the mode for payment in MCC Counselling?', label: 'What is the mode for payment in MCC Counselling?', trigger: 'UG:Ans10' },
                { value: 'How can I pay the counselling fee in MCC Counselling?', label: 'How can I pay the counselling fee in MCC Counselling?', trigger: 'UG:Ans10' },
            ]
        },
        {
            id: 'UG:Ans20',
            message: ' For Deemed Universities – Net Banking/ Card/ UPI. For Govt. Universities – Net Banking',
            end:true
        },
        
    ];

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Nunito Sans',
        fontWeight: '600',
        headerBgColor: 'orange',
        headerFontColor: '#fff',
        headerFontSize: '20px',
        botBubbleColor: 'orange',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    return (
        <>
            <Button
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 30,
                    background: "orange",
                    borderRadius: "50%",
                    padding: "0px",
                    width: "60px",
                    height: "60px",
                    zIndex: 1000
                }}
                aria-describedby={id} onClick={handleClick}>
                <img src={ChatBotImage} style={{ width: 150, height: 110 }} />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <ThemeProvider theme={theme}>
                    <ChatBot
                        steps={steps}
                    />
                </ThemeProvider>
            </Popover>
        </>
    );
}

export default ChatBotComponent;