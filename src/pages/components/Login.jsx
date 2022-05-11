import React from 'react';
import { MdLock, MdEmail } from 'react-icons/md';
import { useState } from 'react';
import './styles/Login.scss';
import axios from 'axios';

let defaultLogin = {
  email: '',
  password: ''
};

export default function Login({ setModal, setModalmsg, setRedirect, setStatus }) {
  const [loginForm, setLoginForm] = useState(defaultLogin);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value
    });
  }
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post("/api2/login", loginForm)
      .then((response) => {
        localStorage.setItem('cve', response.data['cve']);
        if (response.data['role'] === 'root') {
          window.location = '/root/dashboard'
        }

        if (response.data['role'] === 'user') {
          window.location = '/user/dashboard'
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

  return (
    <>
      <form action="#" onSubmit={handleLogin}>
        <div className="form__header">Login</div>
        <div className="input__fields">
          <div className="input__field email">
            <span><MdEmail /></span>
            <input type="email" placeholder="email" name='email' tabIndex="-1" required onChange={handleLoginChange} value={loginForm.name}></input>
            <div className="line"></div>
          </div>
          <div className="input__field password">
            <span ><MdLock /></span>
            <input type="password" placeholder="password" name='password' tabIndex="-1" required onChange={handleLoginChange} value={loginForm.name}></input>
            <div className="line"></div>
          </div>
          <div className="input__field button">
            <input type="submit" value="Login" ></input>

          </div>
          <div className="text">Don't have an account? <label htmlFor="flip">Sign Up now</label>
          </div>
        </div>
      </form>
    </>
  )
}
