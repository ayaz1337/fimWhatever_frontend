import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './styles/Landing.scss';
import { Navigate, NavLink } from 'react-router-dom';

export default function Landing() {

  const handleClick = (event) => {
  }

  return (
    <div className='landing'>
      <div className="app__bar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#687EEE" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                fimWhatever
              </Typography>
              <Button color="inherit" onClick={handleClick}>
                <NavLink exact to='/gateway' className="to__gateway">GATEWAY</NavLink>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className='main__content'>

      </div>
      <div className="footer">
        
      </div>
    </div>
  );
}