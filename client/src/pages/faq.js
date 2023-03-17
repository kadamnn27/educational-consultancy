import React, { useContext, useEffect } from "react";
import {Accordion,AccordionSummary,AccordionDetails,Box,Container,Typography} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "../UserContext.js";

const useStyles = makeStyles(() => ({
  text: {
    fontFamily: "Nunito Sans",
    fontWeight: "600",
  },
}));

const FAQ = ({ navbar, setNavbar }) => {
  const classes = useStyles();
  useEffect(() => {
    setNavbar(true);
  }, []);
  const { mode } = useContext(UserContext);

  return (
    <Container style={{ margin: "80px auto" }}>
      <Typography
      variant="h4"
        style={{
          fontFamily: "Nunito Sans",
          fontWeight: "600",
          color: "darkorange",
          // textShadow: "1px 1px 4px black",
          margin: "0px 15px",
        }}
        align="left"
      >
        FAQs for NEET {mode}
      </Typography>
      {mode === "UG" ?
        <>
          <Accordion style={{borderRadius:'10px', margin:'10px'}}>
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
                What is Medical Admission Counseling?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "khaki",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Medical Admission Counseling is the process of guiding the client
                in making the right decision on choice of best college in lowest
                fees. The admission to a medical college is done through process
                of counseling which is based on candidate's choice filling based
                on NEET Rank, Domicile, Category, Fees Budget. A student may not
                know all the important information about counseling process for
                all the colleges in India. Moreover, there are different scenarios
                which effect the admission process. Expert Educational Consultancy
                will guide you through the counseling process to secure admission
                in best college in lowest fee.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                What is the basis of medical UG admission?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightblue",borderRadius:'10px', margin:'10px'}}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                The Medical UG admission is done on the basis of NEET Rank,
              Category, Domicile and Fees budget. There are > 600 MBBS Colleges
                in India and in which there are 47862 Government Seats, 44215
                Private Seats & 6500 seats comes under Society and Trust. (as on
                05-05-2022). There are multiple quotas and admission criteria of
                colleges in different states, and it is practically impossible for
                a student to have all the knowledge of those quotas and criteria.
                Expert Educational Consultancy will help you with 26+ years of
                expertise in the field
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Can I take admission on my own? Why do I need an admission
                counselor?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightgreen",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
              Yes, You can. If your NEET Rank is very good (>650) then you can
                secure admission in college of your choice because you will rank
                top in counseling cut off list however as the NEET Rank gets
                lower, the admission to the choicest college becomes a matter of
                strategy decided on the basis of choice filling. If you fill in
                the right choice of college, you can get the admission in best
                college with lowest fees budget. If you don't fill the right
                choice, you may lose seat in dream college and/or pay higher fees.
                Expert Educational Consultancy will help you make the right
                choices to ensure you get the admission in best college in lowest
                fees. On the extreme case, student may lose its security deposit
                in some colleges due to counseling process which may lead to
                financial loss. Expert Educational Consultancy will help you save
                those losses by guiding you through the admission counseling
                process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
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
                What will Expert Educational Consultancy do if I enroll for their
                services?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightpink",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy will ensure that you get all the
                required information regarding college forms, last dates,
                counseling schedule and fees deposit dates. Expert Educational
                Consultancy will guide you in choosing the right forms to be
                filled and right choices to be entered for admission counseling.
                Expert Educational Consultancy will help you save time, money and
                hassles on admission counseling. There are many instances wherein
                candidate's admission chances are impacted by environmental
                influences. Expert Educational Consultancy has awareness of these
                variables to help the client get admission in best possible
                college in lowest fees. Expert Educational Consultancy will help
                save you money as well. If you fill in the form of a college where
                there is no chance of your admission, then you will waste money on
                form filling as well as hassle and anxiety of counseling process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Will Expert Educational Consultancy offer any guaranteed
                admission?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightcyan",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                No. Admission to medical colleges happen through a government
                mandated counseling process. Expert Educational Consultancy or for
                that matter, NO other person or agency can influence this process.
                Expert Educational Consultancy doesn't believe in making any false
                claim in this regard as we are in this profession for last over 26
                years. Expert Educational Consultancy will help you through their
                expertise in the defined admission counseling process.{" "}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Why there is difference in consultancy fees of Expert Educational
                Consultancy? Others charge flat fees
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "aquamarine",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy offers the most honest and
                transparent consultancy fees structure which is based on NEET
                Rank, Fees budget and Category. The counseling fees is defined on
                the basis of time and efforts involved in securing the admission
                for candidate. As you might have observed, if the student's NEET
                Rank is high, our consultancy fees is very less (In fact it is
              free if the candidate has scored >630 marks in NEET) because time
                and efforts involved in securing the admission for that candidate
                will be much less as compared to candidate with lower NEET Rank.
                That's the reason Expert Educational Consultancy offers the most
                affordable and transparent fees structure
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
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
                How shall I pay the fees? Is the consultancy fee refundable in
                case I don't get admission?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "violet",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy's professional fees shall be
                payable in advance through cash/cheque/online bank transfer. You
                are most welcome to visit Expert Educational Consultancy office to
                get help on payment of fees. This fee is not refundable except for
                NRI/Management quota fees which may be refunded in case Expert
                Educational Consultancy fails to get a seat for the candidate.
                Please read the service conditions for more details.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                I want to know some information about admission criteria and
                process. Can Expert Educational Consultancy provide me information
                only without charging any consultancy fees?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightgreen",borderRadius:'10px', margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy strongly believe that medical
                admission counseling requires intelligence not the information. In
                fact, over last 26 years we have seen many people who suffered
                because they could not convert information into intelligence.
                That's the reason we as policy don't want to misguide or confuse
                students with information. Moreover, Google has made the
                information freely available to all, one can always get
                information from internet. Expert Educational Consultancy however
                shares the right information through virtual webinars. You can
                attend those webinars to get authentic information. We believe
                that your concern shall be securing admission for the child in
                best college in lowest fees and Expert Educational Consultancy
                will guide you for the admission through their acquired expertise.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{borderRadius:'10px', margin:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                How can I trust Expert Educational Consultancy?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "bisque" ,borderRadius:'10px', margin:'10px'}}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy is a professionally managed company
                which is owned by Mr. Shamsher Rana who is an engineer by
                education and certified admission counselor by profession. Expert
                Educational Consultancy is operating in this profession for over
                26 years now through a permanent office in Prashant Vihar, New
                Delhi. Expert Educational Consultancy has offices in Delhi,
                Haryana, Rajasthan, Punjab, J&K, Maharashtra, Karnataka, Bihar,
                Jharkhand with more than 60 employees to guide and help students
                during the process of admission counseling. Over 26 years, Expert
                Educational Consultancy has helped more than 10,500 students get
                admission in their dream colleges. That's the reason, Mr. Shamsher
                Rana has reference/ past client in practically every district of
                India. His reputation can be confirmed by contacting the past
                clients/references which can be furnished on request
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
        :
        <>
          <Accordion style={{ margin:'10px',borderRadius:'10px' }}>
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
                What is admission counselling?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor: "bisque",borderRadius:'10px', margin:'10px'}}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Admission Counselling is the process of guiding the client in
                making the right decision on choice of best college in lowest
                fees. The admission to a medical college is done through process
                of counselling which is based on candidate's choice filling based
                on NEET Rank, Domicile, Category, Fees Budget. A student may not
                know all the important information about counselling process for
                all the colleges in India. Moreover, there are different scenarios
                which effect the admission process. Expert Educational Consultancy
                will guide you through the counselling process to secure admission
                in best college in lowest fee.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                What is the basis of medical PG admission?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightpink",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                The Medical PG admission is done on the basis of NEET Rank, Category, Domicile and Fees budget. There are
>500 MD/MS/DIPLOMAcolleges inIndia andinwhich Seats and
                242 Private Colleges with 18441 Seats (as on 12-02-2023).Other than MD/MS/ DIPLOMA, there is DNB course also
                which comes under NEET PG counselling. There are 12720 Seats in 655 DNB Colleges / Hospitals. Admission are
                offered to students who apply for the admissiontothat college.
                There are multiple quotas and admission criteria of colleges in different states and it is practically
                impossible for a student to have all the knowledge of those quotas and criteria. Expert Educational
                Consultancywill help you withmorethan27yearsofexpertiseinthis field.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Can I take admission on my own? Why do I need an admission
                counsellor?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "cyan",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Yes, You can. If your NEET Rank is very good then you can secure
                admission in college of your choice because you will rank top in
                counselling cut off list however as the NEET Rank gets lower, the
                admission to the choicest college becomes a matter of strategy
                based on choice filling. If you fill in the right choice of
                college, you can get the admission in best college with lowest
                fees budget. If you don't fill the right choice, you may lose seat
                in dream college and/or pay higher fees. Expert Educational
                Consultancy will help you make the right choices to ensure you get
                the admission in best college in lowest fees. On the extreme case,
                student may lose its security deposit in some colleges due to
                counselling process which may lead to financial loss. Expert
                Educational Consultancy will help you save those losses by guiding
                you through the admission counselling process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
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
                What will Expert Educational Consultancy do if I enrol for their
                services?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "goldenrod",borderRadius:'10px',margin:'10px'}}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy will ensure that you get all the
                required information regarding college forms, last dates,
                counselling schedule and fees deposit dates. Expert Educational
                Consultancy will guide you in choosing the right forms to be
                filled and right choices to be entered for admission counselling.
                Expert Educational Consultancy will help you save time, money and
                hassles on admission counseling. There are many instances wherein
                candidate's admission chances are impacted by environmental
                influences. Expert Educational Consultancy has awareness of these
                variables to help the client get admission in best possible
                college in lowest fees. Expert Educational Consultancy will help
                save you money as well. If you fill in the form of a college where
                there is no chance of your admission, then you will waste money on
                form filling as well as hassle and anxiety of counseling process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Will Expert Educational Consultancy offer any guaranteed
                admission?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "greenyellow",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                No. Admission to medical colleges happen through a government
                mandated counseling process. Expert Educational Consultancy or for
                that matter, NO other person or agency can influence this process.
                Expert Educational Consultancy doesn't believe in making any false
                claim in this regard as we are in this profession for last over 27
                years. Expert Educational Consultancy will help you through their
                expertise in the defined admission counseling process.{" "}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Why there is difference in consultancy fees of Expert Educational
                Consultancy? Others charge flat fees.{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "yellow",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy offers the most honest and
                transparent consultancy fees structure which is based on NEET
                Rank, Fee's budget and Category (In fact it is free if your score
              is >650). The counselling fees is defined on the basis of time and
                efforts involved n securing the admission for candidate
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
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
                How shall I pay the fees? Is the consultancy fee refundable in
                case I don't get admission?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightblue",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy's professional fees shall be
                payable in advance through cash/cheque/online bank transfer. You
                are most welcome to visit Expert Educational Consultancy office to
                get help on payment of fees. This fee is not refundable except for
                NRI/Management quota fees which may be refunded in case Expert
                Educational Consultancy fails to get a seat for the candidate.
                Please read the service conditions for more details.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                I want to know some information about admission criteria and
                process. Can Expert Educational Consultancy provide me information
                only without charging any consultancy fees?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "lightgreen",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy strongly believe that medical admission counselling requires intelligence
                not the information. In fact, over last 27 years we have seen many people who suffered because they could
                not convert information into intelligence. That's the reason we as policy don't want to misguide or confuse
                studentswith information. Moreover, Google has made the information freely available to all, one can
                always get information from internet.
                Expert Educational Consultancy however shares the right & authentic information through virtual
                webinars / WhatsApp. You can attend those webinars or can stay in touch on WhatsApp to get reliable
                information. Your concern shall be securing admission for the child in best college in lowest fees and Expert
                Educational Consultancywillassureyoutheadmissionthroughtheiracquiredwisdom
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{margin:'10px',borderRadius:'10px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                How can I trust Expert Educational Consultancy?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "hotpink",borderRadius:'10px',margin:'10px' }}>
              <Typography
                style={{
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                }}
              >
                Expert Educational Consultancy is a professionally managed company which is owned by Mr. Shamsher
                Rana who is a Mechanical Engineer by education and certified admission counselor by profession. Expert
                Educational Consultancy is operating in this profession for over 27 years now through a permanent office
                in Prashant Vihar, New Delhi.
                Expert Educational Consultancy has offices in Delhi, Haryana, Rajasthan, Punjab, J&K, Maharashtra,
                Karnataka, Bihar, Jharkhand with more than 60 employees to guide and help students during the process
                of admission counseling.
                Over 27 years, Expert Educational Consultancy has helped more than 10,500 students get admission in
                their dream colleges. That's the reason, Mr. Shamsher Rana has reference/ past client in practically every
                district of India. His reputation can be confirmed by contacting the past clients/references which can be
                furnished on request
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      }
    </Container>
  );
};

export default FAQ;
