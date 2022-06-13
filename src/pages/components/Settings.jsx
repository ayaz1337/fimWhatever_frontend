import * as React from 'react';
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

import HelperTable from './Table.jsx';
import CircularLoader from './CircularLoader';
import Slider from '@mui/material/Slider';

let defaultValues = {
    alert: false,
    cron: false,
    interval: 86400,
    manual: false,
    auto_enc: false 
};


const cardVariant1 = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
}
const cardVariant2 = {
    hidden: { opaccity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
}

const setColor = (risk) => {
    switch (risk) {
        case 0: return 'primary'
        case 1: return 'warning'
        case 2: return 'error'
        default: return null
    }
}

export default function Settings({ role }) {
    const [formValues, setFormValues] = useState(defaultValues);
    const [inBase, setInBase] = useState("")
    const [rmBase, setRmBase] = useState("")
    const [rows, setRows] = useState([])
    const [isloading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [modalmsg, setModalmsg] = useState(false)
    const [status, setStatus] = useState(true)
    const [state, setState] = useState(false)
    const [level, setLevel] = useState(0)



    useEffect(() => {
        axios.all([axios.get("/api2/baseline_bak"), axios.get("/api2/analytics")])
            .then((response) => {
                setRows(response[0].data)
                setLevel(response[1].data['risk'])

                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
            })
    }, [modal])




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
        setState(true)
        axios.post('/api2/setseverity', { "risk": level })
        axios.post("/api2/verify", formValues)
            .then((response) => {
                setState(false)
                setModalmsg(response.data['ack'])
                setStatus(true)
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
    };

    const handleInClick = () => {
        setState(true)
        axios.post("/api2/baseline", { "paths": inBase.split(",") })
            .then((response) => {
                setState(false)
                setModalmsg(response.data['ack'])
                setStatus(true)
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

    const handleRmClick = () => {
        setState(true)
        axios.post("/api2/removebaseline", { "id": rmBase })
            .then((response) => {
                setState(false)
                setModalmsg(response.data['ack'])
                setStatus(true)
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

    const handleRmAllClick = (event) => {
        setState(true)
        axios.post("/api2/removeall", {})
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


    const handleColor = (event) => {
        setLevel(event.target.value)
    }

    if (isloading) {
        return <Loader />
    }

    if (role === 'root') {

        return (
            <>
                <CircularLoader state={state} />
                <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} status={status} />
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
                                <FormControlLabel
                                    control={
                                        <Switch checked={formValues.auto_enc} name="auto_enc" onChange={handleSwitchChange}/>
                                    }
                                    label="Auto Encrypt"
                                    labelPlacement="left"
                                    onChange={handleSwitchChange}
                                />
                            </div>
                            <Button variant="outlined" color="primary" type="submit">start scan</Button>
                            <Button variant="outlined" color="primary" type="submit" onClick={handleClick}>stop scan</Button>
                        </form>
                        <Slider defaultValue={level} min={0} max={2} step={1} aria-label="Default" valueLabelDisplay="auto" color={`${setColor(level)}`} onChange={handleColor} />

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
                        <HelperTable rows={rows} />
                    </motion.div>
                </div>
            </>)
    }

    if (role === 'user') {
        return (
            <>
                <CircularLoader state={state} />
                <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} status={status} />
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
                    </motion.div>
                    <motion.div
                        className='table'
                        variants={cardVariant2}
                        initial="hidden"
                        animate="visible">
                        <HelperTable rows={rows} />
                    </motion.div>
                </div>
            </>)
    }
}
