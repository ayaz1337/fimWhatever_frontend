import { motion } from 'framer-motion';
import React from 'react';
import './styles/Profile.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import CircularLoader from './CircularLoader';
import Loader from './Loader';


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
    "role": ""
  })

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState({
    pass: "",
    confirm_pass: ""
  })

  const [isloading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [modalmsg, setModalmsg] = useState(false)
  const [status, setStatus] = useState(true)
  const [state, setState] = useState(false)

  useEffect(() => {
    axios.get("/api2/whoami")
      .then((response) => {
        setProfile({
          "user": response.data['user'],
          "email": response.data['email'],
          "role": response.data['role']
        })
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [modal])

  const handleSubmitEmail = (event) => {
    event.preventDefault();
    setState(true)
    axios.post("/api2/updateemail", { "email": email })
      .then((response) => {
        setState(false)
        setStatus(true)
        setModalmsg(response.data['ack'])
        setTimeout(() => {
          setModal(true)
        }, 800)
      })
      .catch((error) => {
        setModal(true)
        setModalmsg(error.response.data['error'])
        setState(false)
        setStatus(false)
      })
  }

  const handleSubmitPass = (event) => {
    event.preventDefault();
    setState(true)
    axios.post("/api2/updatepassword", { "pass": password.pass, "confirm_pass": password.confirm_pass })
      .then((response) => {
        setState(false)
        setStatus(true)
        setModalmsg(response.data['ack'])
        setTimeout(() => {
          setModal(true)
        }, 800)
      })
      .catch((error) => {
        setModal(true)
        setModalmsg(error.response.data['error'])
        setState(false)
        setStatus(false)
      })
  }

  const handleChange = (event) => {
    let target = event.target.id.split(" ")[1]
    console.log(target)
    if (target === 'pass' || target === 'confirm_pass') {
      setPassword({
        ...password,
        [target]: event.target.value
      })
    }

    if (target === 'email') {
      setEmail(event.target.value)
    }
  }


  if (isloading) {
    return <Loader />
  }

  return (
    <div className='profile'>
      <CircularLoader state={state} />
      <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} status={status} />
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
        <form acrion="#" className="email__form" onSubmit={handleSubmitEmail}>
          <TextField id="outlined-basic email" placeholder="email" variant="outlined" style={{ maxWidth: 500 }} value={email}
            onChange={handleChange} />
          <Button variant="contained" type="submit" className="submit__btn">update email</Button>
        </form>
        <form acrion="#" className='password__form' onSubmit={handleSubmitPass}>
          <TextField id="outlined-basic pass" name="pass" placeholder="password" variant="outlined" type="password" style={{ maxWidth: 500 }}
            onChange={handleChange} value={password.pass} />
          <TextField id="outlined-basic confirm_pass" placeholder="confirm password" variant="outlined" type="password" style={{ maxWidth: 500 }}
            onChange={handleChange} value={password.confirm_pass} />
          <Button variant="contained" type="submit" className="submit__btn">update password</Button>
        </form>
      </motion.div>
    </div>
  )
}
