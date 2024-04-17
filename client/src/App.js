import './App.css';
import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import ChatBotComponent from './components/chatBot';
import Footer from './components/footer';
import FAQ from './pages/faq';
import Colleges from './pages/colleges';
import Account from './pages/account';
import Course from './pages/course';
import AboutPG from './pages/aboutPG';
import AboutUG from './pages/aboutUG';
import { makeStyles } from '@material-ui/core';
import { UserContext } from './UserContext';
import Cookies from 'js-cookie';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicies from './pages/RefundPolicies';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#f1f1f1",
    fontFamily: "Nunito Sans",
    fontWeight: "600"
  }
}));

function App() {
  const [navbar, setNavbar] = useState(false);
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [cookieToken, setCookieToken] = useState(null);
  const [course, setCourse] = React.useState('Course Details');
  const [mode, setMode] = useState(null);
  const [accountPage, setAccountPage] = useState('Profile');
  console.log("Reached App.js");

  //This method would work but seems taxing to the computer power.
  // window.setInterval(() => {
  //   if (!Cookies.get('token')) {
  //     setUser(null);
  //   }
  // }, 10000);

  useEffect(() => {
    if (Cookies.get('token')) setCookieToken(Cookies.get('token'));
    else {
      localStorage.removeItem('user');
    }
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [])
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user])
  return (
    <UserContext.Provider value={{ user, setUser, cookieToken, setCookieToken, course, setCourse, mode, setMode,accountPage,setAccountPage }}>
      <div className={classes.App}>
        <Router>
          {mode || window.location.pathname !== '/' ? <Navbar navbar={navbar} setNavbar={setNavbar} /> : <></>}
          <Routes>
            <Route exact path="/" element={<Home navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/about" element={<About navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/login" element={<Login navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/register" element={<Register navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/faq" element={<FAQ navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/colleges" element={<Colleges navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/account" element={<Account navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/course" element={<Course navbar={navbar} setNavbar={setNavbar} />} />
            <Route eaxct path="/about/UG" element={<AboutUG navbar={navbar} setNavbar={setNavbar} />} />
            <Route eaxct path="/about/PG" element={<AboutPG navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions navbar={navbar} setNavbar={setNavbar} />} />
            <Route path="/RefundPolicies" element={<RefundPolicies navbar={navbar} setNavbar={setNavbar} />} />
          </Routes>
        {mode || window.location.pathname !== '/' ? <ChatBotComponent /> : <></>}
        {mode || window.location.pathname !== '/' ? <Footer /> : <></>}
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
