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
import { ForkRight } from '@mui/icons-material';


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
      reset: true
    })

    sr.reveal('.row__one>.banner', { opacity: 0, duration: 1500 })
    sr.reveal('.row__one>.textArea>div', { distance: '100%', opacity: 0, duration: 1500, origin: 'top', interval: 500 })
    sr.reveal('.row__one>.textArea>.button', { distance: '100%', opacity: 0, duration: 1500, origin: 'bottom' })
    sr.reveal('.row__two>div', { opacity: 0, duration: 1500, interval: 500 })
    sr.reveal('.row__three > div:nth-child(1), .row__three > div:nth-child(2), .row__three > div:nth-child(3)', { opacity: 0, duration: 1500, interval: 500 })
    sr.reveal('.row__four', { opacity: 0, scale: 0.5, duration: 1500, delay: 1500 })
    sr.reveal(`
    .row__five > div:nth-child(1) > div > div > div.cardImg,
    .row__five > div:nth-child(2) > div > div > div.cardImg, 
    .row__five > div:nth-child(3) > div > div > div.cardImg
    `,{ opacity: 0, duration: 2000, interval: 500, delay: 500, reset: false }
    )
    sr.reveal(`
    .row__five > div:nth-child(1) > div > div > div.textArea,
    .row__five > div:nth-child(3) > div > div > div.textArea
    `, { distance: '100%', opacity: 0, duration: 1500, origin: 'right', reset: false })
    sr.reveal('.row__five > div:nth-child(2) > div > div > div.textArea', { distance: '100%', opacity: 0, duration: 1500, origin: 'left', reset: false })
  })

  return (
    <div className="landing">
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar sx={{ background: "#ffffff" }} className='app__bar'>
            <Toolbar className='tool__bar'>
              <Avatar alt="Cindy Baker" src={Logo} sx={{ mr: 2 }} />
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
              <Typography variant="h4" component="div" sx={{ color: "#687EEE" }}>
                Product Name
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: "#000000", mt: 1 }}>
                Product slogan introduction
              </Typography>
              <Typography variant="h7" component="div" sx={{ color: "#384170", my: 4 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium esse odit labore quasi earum, fuga omnis porro iure dolores ab optio aspernatur quas dolorum sit ullam doloremque numquam dolor. Aut.
              </Typography>
              <Button variant="contained" className='button'>
                <NavLink exact to='/' className="to__gateway">start using</NavLink>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </div>

          <div className="row__three">
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg1} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg3} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370, boxShadow: "none" }}>
              <CardContent className='cardContent'>
                <div className="cardImg">
                  <img src={CardImg2} alt="" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div" style={{ textAlign: "center" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="row__four">
            <img src={CardImg2} alt="" />
            <Typography gutterBottom variant="h4" component="div" sx={{ mb: 5 }} className="h4__header">
              About Something
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div" style={{ textAlign: "center", color: "#ffffff" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </div>

          <div className="row__two">
            <Typography variant="h3" component="div" sx={{ color: "#687EEE" }} className='h3__header' style={{ textAlign: "center" }}>
              Build on best practices
            </Typography>
            <Typography variant="body2" component="div" sx={{ color: "#6441a5", my: 1 }} style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                      Python
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
                      React
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
                      MongoDB
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
      </React.Fragment>
    </div>
  );
}
