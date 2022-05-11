import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './styles/Gateway.scss';
import Cover from '../../src/assets/wp1848364-security-wallpapers.jpg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from './components/Modal';



export default function Gateway() {
  const [modal, setModal] = useState(false)
  const [modalmsg, setModalmsg] = useState()
  const [redirect, setRedirect] = useState(false)
  const [status, setStatus] = useState(false)

  
  return (
    <div className='container__body' >
      <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} redirect={redirect} status={status} />
      <motion.div className="container" initial={{ opacity: 0, y: "-100vh" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: "spring" }}>
        <input type="checkbox" id="flip"></input>
        <div className="cover">
          <div className="cover__img">
            <img src={Cover} alt=""></img>
          </div>
        </div>
        <div className="form__body">
          <div className="login__form">
            <Login setModal={setModal} setModalmsg={setModalmsg} setRedirect={setRedirect} setStatus={setStatus} />
          </div>
          <div className="signup__form">
            <SignUp setModal={setModal} setModalmsg={setModalmsg} setRedirect={setRedirect} setStatus={setStatus} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
