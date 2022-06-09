import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Logo from '../assets/hoyolab.jpeg';
import { Avatar } from '@mui/material';
import './styles/Landing.scss';
import { Navigate, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Banner from '../assets/A_-wAhRYnWQscAAAAAAAAAAABkARQnAQ.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardImg1 from '../assets/security-identify.svg';
import CardImg2 from '../assets/security-update.svg';
import CardImg3 from '../assets/security-fix.svg';
import PythonLogo from '../assets/python.png';
import ReactLogo from '../assets/react.png';
import MongoLogo from '../assets/mongo.png';
import { FaTwitter, FaGithub, FaDiscord, FaTelegramPlane, FaLinkedinIn } from 'react-icons/fa';
import scrollreveal from 'scrollreveal';
import ScrollToTop from "react-scroll-to-top";
import { AiFillCode } from 'react-icons/ai';


function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {

  React.useEffect(() => {
    const sr = scrollreveal({
      reset: false
    })

    sr.reveal('.row__one>.banner', { opacity: 0, duration: 1500, scale: 0.5 })
    sr.reveal('.row__one>.textArea>div', { distance: '100%', opacity: 0, duration: 1500, origin: 'top', interval: 300 })
    sr.reveal('.row__one>.textArea>.button', { distance: '100%', opacity: 0, duration: 1500, origin: 'bottom' })
    sr.reveal('.row__two>div', { opacity: 0, duration: 1500, interval: 300 })
    sr.reveal(`
    .row__three > div:nth-child(1), 
    .row__three > div:nth-child(2), 
    .row__three > div:nth-child(3), 
    .row__four`, { opacity: 0, duration: 1500, interval: 300, scale: 0.5 })
    sr.reveal(`
    .row__five > div:nth-child(1) > div > div > div.cardImg,
    .row__five > div:nth-child(2) > div > div > div.cardImg, 
    .row__five > div:nth-child(3) > div > div > div.cardImg
    `, { opacity: 0, duration: 2000, interval: 300, delay: 500 }
    )
    sr.reveal(`
    .row__five > div:nth-child(1) > div > div > div.textArea,
    .row__five > div:nth-child(3) > div > div > div.textArea,
    .row__five > div:nth-child(2) > div > div > div.textArea
    `, { distance: '100%', opacity: 0, duration: 1500, interval: 300 })
    sr.reveal('.row__five > div:nth-child(1) > div > div > div.textArea, .row__five > div:nth-child(3) > div > div > div.textArea', { origin: 'right' })
    sr.reveal('.row__five > div:nth-child(2) > div > div > div.textArea', { origin: 'left' })
  })

  return (
    <div className="landing">
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar sx={{ background: "#ffffff" }} className='app__bar'>
            <Toolbar className='tool__bar'>
              <Avatar alt="fimWhatever" src={Logo} sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ color: "#687EEE", flexGrow: 1 }}>
                fimWhatever
              </Typography>
              <Button variant="contained">
                <NavLink exact to='/gateway' className="to__gateway">GATEWAY</NavLink>
              </Button>

            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container className='main__content'>
          <div className="row__one">
            <div className="banner">
              <img src={Banner} alt="" />
            </div>
            <div className="textArea">
              <Typography variant="h4" component="div">
                fim<span>Whatever</span><span className='blink'>_</span>
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: "#000000", mt: 1 }}>
                A simple File Integrity Monitor
              </Typography>
              <Typography variant="h7" component="div" sx={{ color: "#384170", my: 4 }}>
                The fimWhatever Security Information and Event Management (SIEM) solution provides monitoring, detection, and alerting of security events and incidents.
              </Typography>
              <Button variant="contained" className='button' size='large'>
                <NavLink exact to='/gateway' className="to__gateway">start using</NavLink>
              </Button>
            </div>
          </div>

          <div className="row__two">
            <Typography variant="h10" component="div" sx={{ color: "#384170" }} style={{ textAlign: "center" }}>
              SECURITY
            </Typography>
            <Typography variant="h3" component="div" sx={{ color: "#687EEE" }} className="h3__header" style={{ textAlign: "center" }}>
              Stay secure end to end
            </Typography>
            <Typography variant="body2" component="div" sx={{ color: "#6441a5", my: 1 }} style={{ textAlign: "center" }}>
              Leverage the security community’s expertise, and use open source securely.
            </Typography>
          </div>

          <div className="row__three">
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg1} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Integrity Monitoring
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  File integrity monitoring is an internal control or process that performs the act of validating the integrity of operating system and application software files using a verification method between the current file state and a known
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg3} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Threat Detection
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  Threat detection is the practice of analyzing the entirety of a security ecosystem to identify any malicious activity that could compromise the network. If a threat is detected, then mitigation efforts must be enacted to properly neutralize the threat
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg2} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Log Data Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  Log analysis is the process of reviewing computer-generated event logs to proactively identify bugs, security threats, factors affecting system or application performance, or other risks. Log analysis can also be used more broadly to ensure compliance
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="row__four">
            <img src={CardImg2} alt="" />
            <Typography gutterBottom variant="h4" component="div" sx={{ mb: 5 }} className="h4__header">
              About FIM
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div" style={{ textAlign: "center", color: "#ffffff" }}>
              File integrity monitoring (FIM) is an internal control or process that performs the act of validating the integrity of operating system and application software files using a verification method between the current file state and a known, good baseline. This comparison method often involves calculating a known cryptographic checksum of the file's original baseline and comparing with the calculated checksum of the current state of the file. Other file attributes can also be used to monitor integrity
            </Typography>
          </div>

          <div className="row__two">
            <Typography variant="h3" component="div" sx={{ color: "#687EEE" }} className='h3__header' style={{ textAlign: "center" }}>
              Build on best practices
            </Typography>
            <Typography variant="body2" component="div" sx={{ color: "#6441a5", my: 1 }} style={{ textAlign: "center" }}>
              Use and adapt workflows built by industry leaders and the open source community
            </Typography>
          </div>

          <div className="row__five">
            <Card sx={{ background: 'inherit', boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex' }} className="flex__box">
                  <div className="cardImg">
                    <img src={PythonLogo} alt="" />
                  </div>
                  <div className='textArea'>
                    <Typography gutterBottom variant="h5" component="div">
                      <AiFillCode /> Python
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      learn more
                    </Button>
                  </div>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ background: 'inherit', boxShadow: 'none' }} >
              <CardContent>
                <Box sx={{ display: 'flex' }} className="flex__box">
                  <div className='textArea'>
                    <Typography gutterBottom variant="h5" component="div">
                      <AiFillCode /> React
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      learn more
                    </Button>
                  </div>
                  <div className="cardImg">
                    <img src={ReactLogo} alt="" />
                  </div>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ background: 'inherit', boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex' }} className="flex__box">
                  <div className="cardImg">
                    <img src={MongoLogo} alt="" />
                  </div>
                  <div className='textArea'>
                    <Typography gutterBottom variant="h5" component="div">
                      <AiFillCode /> MongoDB
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      learn more
                    </Button>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </div>
          <div className="row__two">
            <Typography variant="h10" component="div" color="text.primary" >
              OBSCURITY
            </Typography>
            <Typography variant="h4" component="div" color="text.primary" sx={{ textAlign: "center" }}>
              Security through obscurity
            </Typography>
          </div>
        </Container>

        <div className='footer'>
          <div className="social__links">
            <div className="twitter" href="google.com">
              <FaTwitter />
            </div>
            <div className="github">
              <FaGithub />
            </div>
            <div className="discord">
              <FaDiscord />
            </div>
            <div className="telegram">
              <FaTelegramPlane />
            </div>
            <div className="linkedin" onClick={() => { window.location = "https://facebook.com" }}>
              <FaLinkedinIn />
            </div>
          </div>
        </div>
        <ScrollToTop smooth top='1000' />
      </React.Fragment>
    </div>
  );
}
