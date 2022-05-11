import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.scss';
import Logo from '../../assets/hoyolab.jpeg';
import { MdPerson, MdSettings, MdSpaceDashboard, MdCode, MdDownload, MdLogout } from 'react-icons/md';
import Filedownload from './Filedownload';




export default function Sidebar({ role }) {
  const handleLogout = (event) => {
    axios.post("/api2/logout")
      .then((response) => {
        if (response.status === 200) {
          window.location = '/gateway'
        }
      })
      .catch((error) => {
      })
  }

  if (role === "root") {
    return (
      <div className='root__sidebar'>
        <div className="top">
          <div className="logo">
            <img src={Logo} alt=""></img>
            <h2>fim<span>Whatever</span></h2>
          </div>
          <div className="links">
            <ul>
              <NavLink to="home" exact activeclassname="active" className="nav__link" >
                <MdSpaceDashboard className='libk__icon' />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="profile" exact activeclassname="active" className="nav__link" >
                <MdPerson />
                <span>Profile</span>
              </NavLink>

              <NavLink to="settings" exact activeclassname="active" className="nav__link" >
                <MdSettings />
                <span>Settings</span>
              </NavLink>

              <NavLink to="console" exact activeclassname="active" className="nav__link" >
                <MdCode />
                <span>Console</span>
              </NavLink>
              <a href="#" className="nav__link" onClick={Filedownload}>
                <MdDownload />
                <span>Syslog</span>
              </a>

              <a href="#" className="nav__link logout" onClick={handleLogout}>
                <MdLogout />
                <span>Logout</span>
              </a>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (role === "user") {
    return (
      <div className='root__sidebar'>
        <div className="top">
          <div className="logo">
            <img src={Logo} alt=""></img>
            <h2>fim<span>Whatever</span></h2>
          </div>
          <div className="links">
            <ul>
              <NavLink to="home" exact activeclassname="active" className="nav__link" >
                <MdSpaceDashboard className='libk__icon' />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="profile" exact activeclassname="active" className="nav__link" >
                <MdPerson />
                <span>Profile</span>
              </NavLink>

              <NavLink to="settings" exact activeclassname="active" className="nav__link" >
                <MdSettings />
                <span>Settings</span>
              </NavLink>
              <a href="#" className="nav__link" onClick={Filedownload}>
                <MdDownload />
                <span>Syslog</span>
              </a>

              <a href="#" className="nav__link logout" onClick={handleLogout}>
                <MdLogout />
                <span>Logout</span>
              </a>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}