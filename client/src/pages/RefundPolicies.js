import React from 'react';
import { Typography, Container } from '@material-ui/core';

const RefundPolicies = () => {
    return (
        <Container style={{ margin: "80px auto" }}>
            <Typography align="center" variant="h2" style={{ color: "orange", textShadow: "1px 1px 3px #0411af", marginBottom: "10px", fontFamily: "Nunito Sans", fontWeight: "600" }}>
                Refund Policies
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>1. Refund Request Process:</Typography>
            <Typography>
                a) To request a refund, students must fill out the Refund Request Form available on our website or contact our Customer Support team.<br />
                b) Provide proof of enrollment and reasons for requesting a refund (e.g., dissatisfaction with course content, technical issues).
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>2. Refund Timeframe:</Typography>
            <Typography>
                a) Refunds are processed within 14 business days from the date of receiving a valid refund request.<br />
                b) Allowance for processing delays during peak enrollment periods.
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>3. Refund Amounts:</Typography>
            <Typography>
                a) Full refunds will be issued if the withdrawal is within the eligible timeframe and no course materials have been accessed.<br />
                b) Partial refunds may be calculated based on the percentage of the course completed before the refund request.
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>4. Exceptions and Limitations:</Typography>
            <Typography>
                a) Non-refundable deposits or registration fees are not eligible for refunds.<br />
                b) Refunds do not apply to specialized workshops, seminars, or personalized consulting services unless explicitly stated otherwise.<br />
                c) Promotional offers or discounts may have their own refund terms and conditions.
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>5. Cancellation Policy:</Typography>
            <Typography>
                a) Students may cancel their enrollment by providing written notice at least 48 hours before the course start date to avoid penalties.<br />
                b) Cancellations made within 48 hours of the course start date may be subject to a cancellation fee.
            </Typography>
            <Typography variant="h4" style={{ marginBottom: "10px" }}>6. Contact Information:</Typography>
            <Typography>
                For refund inquiries or assistance, contact our Customer Support team at <a href="mailto:expertec104@gmail.com">expertec104@gmail.com</a> or call <a href="tel:+919313555010">+91-9313555010</a>.
            </Typography>
        </Container>
    );
}

export default RefundPolicies;


