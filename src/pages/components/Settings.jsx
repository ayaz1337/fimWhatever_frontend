import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles/Settings.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Modal from './Modal';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


let defaultValues = {
    alert: false,
    cron: false,
    interval: 86400,
    manual: false
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#7DA0FA",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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


export default function Settings() {
    const [formValues, setFormValues] = useState(defaultValues);
    const [inBase, setInBase] = useState("")
    const [rmBase, setRmBase] = useState("")
    const [rows, setRows] = useState([])
    const [isloading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [modalmsg, setModalmsg] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [status, setStatus] = useState(true)



    useEffect(() => {
        axios.get("/api2/baseline_bak")
            .then((response) => {
                setRows(response.data)

                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
            })
    }, [modal])


    const handleStatus = (status) => {
        if (status === 2) { return ['success', 'Integrity Safe', '#edf7ed'] }
        if (status === 3) { return ['error', 'Integrity Compromised', '#fdeded'] }
        if (status === 4) { return ['warning', 'Removed', '#fff4e5'] }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleInChange = (e) => {
        const { value } = e.target;
        setInBase(value)

    }

    const handleRmChange = (e) => {
        const { value } = e.target;
        setRmBase(value)

    }

    const handleSwitchChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.checked,
        });
    };


    const handleClick = (event) => {
        setFormValues(defaultValues)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api2/verify", formValues)
            .then((response) => {
                setModal(true)
                setModalmsg(response.data['ack'])
                setStatus(true)
            })
            .catch((error) => {
                setModal(true)
                setModalmsg(error.response.data['error'])
                setStatus(false)
            })
    };

    const handleInClick = () => {
        axios.post("/api2/baseline", { "paths": inBase.split(",") })
            .then((response) => {
                setModal(true)
                setModalmsg(response.data['ack'])
                setStatus(true)
            })
            .catch((error) => {
                setModal(true)
                setModalmsg(error.response.data['error'])
                setStatus(false)
            })
    }

    const handleRmClick = () => {
        axios.post("/api2/removebaseline", { "id": rmBase })
            .then((response) => {
                setModal(true)
                setModalmsg(response.data['ack'])
                setStatus(true)
            })
            .catch((error) => {
                setModal(true)
                setModalmsg(error.response.data['error'])
                setStatus(false)
            })
    }

    const handleRmAllClick = (event) => {
        axios.post("/api2/removeall", {})
            .then((response) => {
                setModal(true)
                setModal(true)
                setModalmsg(response.data['ack'])
                setStatus(true)
            })
            .catch((error) => {
                setModal(true)
                setModalmsg(error.response.data['error'])
                setStatus(false)
            })
    }

    const handleSearchChange = (event) => {
        const val = document.querySelector(`#${event.target.id}`).value.toUpperCase();
        let tr = document.querySelectorAll("#table__row");
        for (let i=0; i<tr.length; i++){
            let file = tr[i].getElementsByClassName("table__data")[0]
            if (file.textContent.toUpperCase().indexOf(val) > -1) {
                tr[i].style.display=""
            }
            else{
                tr[i].style.display="none"
            }
        }
    }

    if (isloading) {
        return <Loader />
    }

    return (
        <>
            <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} redirect={redirect} status={status} />
            <div className='settings'>
                <motion.div
                    variants={cardVariant1}
                    initial="hidden"
                    animate="visible"
                    className='config'
                >
                    <form onSubmit={handleSubmit} className="config__form">
                        <div className='input__interval'>
                            <TextField
                                id="input__interval"
                                name="interval"
                                label="Interval"
                                type="number"
                                value={formValues.interval}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>

                        <div className='switch'>
                            <FormControlLabel
                                control={
                                    <Switch checked={formValues.alert} onChange={handleSwitchChange} name="alert" />
                                }
                                label="Enable Alerts"
                                labelPlacement="left"
                                onChange={handleSwitchChange}
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={formValues.cron} onChange={handleSwitchChange} name="cron" />
                                }
                                label="Automatic Scan"
                                labelPlacement="left"
                                onChange={handleSwitchChange}
                            />
                            <FormControlLabel
                                control={
                                    <Switch checked={formValues.manual} onChange={handleSwitchChange} name="manual" />
                                }
                                label="Manual Scan"
                                labelPlacement="left"
                                onChange={handleSwitchChange}
                            />
                        </div>
                        <Button variant="outlined" color="primary" type="submit">start scan</Button>
                        <Button variant="outlined" color="primary" type="submit" onClick={handleClick}>stop scan</Button>
                    </form>


                    <div className='add__baseline'>
                        <TextField
                            id="add__baseline"
                            name="baseline"
                            label=""
                            type="text"
                            placeholder='path'
                            value={inBase}
                            onChange={handleInChange}
                            fullWidth
                        />
                        <Button variant="outlined" color="info" type="button" onClick={handleInClick} >Add Baseline</Button>
                    </div>

                    <div className='remove__baseline'>
                        <TextField
                            id="remove__baseline"
                            name="remove__baseline"
                            label=""
                            type="text"
                            placeholder='file id'
                            value={rmBase}
                            onChange={handleRmChange}
                            fullWidth
                        />
                        <Button variant="outlined" color="error" type="button" onClick={handleRmClick} >remove Baseline</Button>
                        <Button variant="outlined" color="error" type="button" onClick={handleRmAllClick} >remove all</Button>
                    </div>
                </motion.div>
                <motion.div
                    className='table'
                    variants={cardVariant2}
                    initial="hidden"
                    animate="visible">
                    <Paper
                        component="box"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                    >
                        <InputBase
                            onChange={handleSearchChange}
                            id="search__table"
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <TableContainer component={Paper} className="table_container">
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow >
                                    <StyledTableCell align="center" >File Id</StyledTableCell>
                                    <StyledTableCell align="left">File Path</StyledTableCell>
                                    <StyledTableCell align="left">File Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.file_id} id="table__row">
                                        <StyledTableCell component="th" scope="row" align="center" >
                                            {row.file_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" className='table__data'>{row.file}</StyledTableCell>
                                        <StyledTableCell align="left"><Alert severity={handleStatus(row.status)[0]} className="alert"></Alert></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </div>
        </>

    );
}
