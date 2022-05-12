import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Activities.scss';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import $ from 'jquery';
import axios from 'axios';
import CircularLoader from './CircularLoader';



function Filter(tr, cmd, arg) {
  switch (cmd) {
    case '-F':
      return tr.querySelector(".file__path").textContent.toUpperCase().indexOf(arg) > -1
    case '-I':
      return tr.querySelector(".accor__summary").textContent.toUpperCase().indexOf(arg) > -1
    case '-S':
      return tr.querySelector(".file__status").textContent.toUpperCase().indexOf(arg) > -1
    default:
      return true
  }
}

export default function Activities({ activities, setModal, setModalmsg, setStatus }) {
  const [state, setState] = useState(false)

  const handleStatus = (status) => {
    switch (status) {
      case 2:
        return ['success', 'Integrity Safe', '#edf7ed']
      case 3:
        return ['error', 'Integrity Compromised', '#fdeded']
      case 4:
        return ['warning', 'Removed', '#fff4e5']
      default:
        return ['info', 'Encrypted', '']
    }
  }

  const handleBtnClick = (e) => {
    setState(true)
    const { id, value } = e.target;
    axios.post("/api2/encrypt", { "id": document.getElementById(value).textContent, "mode": document.getElementById(id).textContent })
      .then(response => {
        setState(false)
        setModalmsg(response.data['ack'])
        setStatus(true)
        setTimeout(() => {
          setModal(true)
        }, 800)
      })
      .catch(error => {
        setState(false)
        setStatus(false)
        setModalmsg(error.response.data['error'])
        setModal(true)
      })
  }

  const handleSearchChange = (event) => {
    const val = document.querySelector(`#${event.target.id}`).value.toUpperCase();
    let tr = document.querySelectorAll("#accor__main");

    if (val.length > 0 && val != "") {
      $('body').addClass('stop-scrolling')
      $('.activities').css('min-height', "100vh")
    }
    else {
      $('body').removeClass('stop-scrolling')
    }


    for (let i = 0; i < tr.length; i++) {
      if (Filter(tr[i], val.split(":")[0], val.split(":")[1])) {
        tr[i].style.display = ""
      }
      else {
        tr[i].style.display = "none"
      }
    }
  }

  const handleFocus = () => {
  }

  const handleBlur = () => {
    $('body').removeClass('stop-scrolling')
    $('.activities').css('min-height', "auto")
  }
  return (
    <><CircularLoader state={state} />
      <motion.div
        className='activities'
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        <div className='search__file'>
          <Paper
            component="box"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
          >
            <InputBase
              onFocus={handleFocus}
              onChange={handleSearchChange}
              onBlur={handleBlur}
              id="search__table"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        {activities.map(file => (
          <Accordion id="accor__main">
            <AccordionSummary className="accor__summary"
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${file.panel_id}d-content`}
              id={`file_id_${file.panel_id}d`}
              style={{ wordWrap: "break-word" }}
            >
              <Typography>
                <Alert severity={handleStatus(file.status)[0]} className={`alert _id${file.panel_id}d`} style={{ fontSize: "12px" }}>{file.file_id}</Alert>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="accor__details">
              <Typography style={{ wordWrap: "break-word" }} >
                <div className="file__status file__item">
                  <Typography>{handleStatus(file.status)[1]}</Typography>
                </div>
                <div className='file__path file__item'>
                  <Typography style={{ wordWrap: "break-word" }}>{file.file}</Typography>
                </div>
                <div className='file__hash file__item'>
                  <Typography style={{ wordWrap: "break-word" }}>{file.hash}</Typography>
                </div>
                <div className="file__item file__cdate">
                  <Typography style={{ wordWrap: "break-word" }}>Create Date: {file.createdate}</Typography>
                </div>
                <div className="file__item file__mdate">
                  <Typography style={{ wordWrap: "break-word" }}>Modify Date: {file.modifydate}</Typography>
                </div>
                <div className='file__encrypt file__item'>
                  <Button variant="outlined" color="error" type="submit" onClick={handleBtnClick}
                    value={`file_id_${file.panel_id}d`} id={`file__encrypt_${file.panel_id}`}>{file.status < 5 ? 'Encrypt' : 'Decrypt'}</Button>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </motion.div>
    </>
  );
}