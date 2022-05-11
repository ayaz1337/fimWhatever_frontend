import axios from 'axios';
import React from 'react';
import { MdLock, MdEmail } from 'react-icons/md';
import { useState } from 'react';

let defaultSignUp = {
  email: '',
  password: '',
  confirm_password: ''
};

export default function SignUp({ setModal, setModalmsg, setRedirect, setStatus }) {
  const [signUpForm, setSignUpForm] = useState(defaultSignUp);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;

    setSignUpForm({
      ...signUpForm,
      [name]: value
    });
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    axios.post("/api2/signup", signUpForm)
      .then((response) => {
        if (response.status === 200) {
          setModal(true)
          setModalmsg(response.data['ack'])
          setRedirect(true)
          setStatus(true)
        }
      })
      .catch((error) => {
        let response = error.response.data
        setModal(true)
        setModalmsg(response['error'])
        setRedirect(false)
        setStatus(false)

      })
  }
  const handleValidation = (e) => {
    const { value } = e.target
    if (value === signUpForm.password) {
      document.querySelector("#confirm__password__error").style.backgroundColor = "#687EEE"
    }
    else {
      document.querySelector("#confirm__password__error").style.backgroundColor = "#F3797E"
    }
  }

  const handleChange = (event) => {
    handleSignUpChange(event)
    handleValidation(event)
  }

  return (
    <>
      <form action="#" onSubmit={handleSignUp}>
        <div className="form__header">Sign Up</div>
        <div className="input__fields">
          <div className="input__field email">
            <span><MdEmail /></span>
            <input type="email" placeholder="email" name='email' tabIndex="-1" onChange={handleSignUpChange} required></input>
            <div className="line"></div>
          </div>
          <div className="input__field password">
            <span><MdLock /></span>
            <input type="password" placeholder="password" name='password' tabIndex="-1" onChange={handleSignUpChange} required></input>
            <div className="line"></div>
          </div>
          <div className="input__field password">
            <span><MdLock /></span>
            <input type="password" className="cpw" placeholder="confirm password" name='confirm_password' tabIndex="-1" onChange={handleChange} required></input>
            <div className="line" id="confirm__password__error"></div>
          </div>
          <div className="input__field button">
            <span></span>
            <input type="submit" value="Sign Up"></input>
          </div>
          <div className="text">Already have an account? <label htmlFor="flip">Login now</label>
          </div>
        </div>
      </form>
    </>
  )
}
