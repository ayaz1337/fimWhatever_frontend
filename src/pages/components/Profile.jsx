import { motion } from 'framer-motion';
import React from 'react';
import './styles/Profile.scss';
import { MdPerson } from 'react-icons/md';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CardImg8 from '../../../src/assets/convert 7.png';
import { useState, useEffect } from 'react';
import axios from 'axios';


const cardVariant1 = {
  hidden: { opacity: 0, y: "-500px" },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}
const cardVariant2 = {
  hidden: { opaccity: 0, y: "500px" },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}


export default function RootProfile() {
  const [profile, setProfile] = useState({
    "user": "",
    "email": "",
    "role":""
  })

  useEffect(() => {
    axios.get("/api2/whoami")
      .then((response) => {
        console.log(response.data)
        setProfile({
          "user": response.data['user'],
          "email": response.data['email'],
          "role": response.data['role']
        })
        console.log(profile)
      })
      .catch((error) => {

      })
  }, [])
  return (
    <div className='profile'>
      <motion.div
        className="info"
        variants={cardVariant1}
        initial="hidden"
        animate="visible">
        <Card className="profile__card">
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="green iguana"
            />
            <CardContent className='card__content'>
              <Typography gutterBottom variant="h6" component="div" style={{ marginTop: 30 }}>
                {profile['user']}
              </Typography>
              <Typography variant="body2" component="div" color="text.secondary">
                {profile['email']}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginBottom: 30, marginTop: 10 }}>
              privilege: {profile['role']} 
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ padding: "30px 0 30px 0" }}>
            <div className='card__footer'>
            </div>
          </CardActions>
        </Card>
      </motion.div>

      <motion.div
        className='update__details'
        variants={cardVariant2}
        initial="hidden"
        animate="visible">
        <Card className="update__card">
          <CardActionArea>
            <CardContent className='card__content'>
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  hidden
                />
              </Button>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ padding: "30px 0 30px 0" }}>
            <div className='card__footer'>
            </div>
          </CardActions>
        </Card>
      </motion.div>
    </div>
  )
}
