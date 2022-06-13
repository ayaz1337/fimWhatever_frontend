import React from 'react';
import Analytics from './Analytics';
import Activities from './Activities';
import Overview from './Overview';
import Loader from './Loader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/Home.scss';
import Modal from './Modal';

export default function RootHome() {
    const [isloading, setLoading] = useState(true)
    const [activities, setActivities] = useState([])
    const [overview, setOverview] = useState([])
    const [analytics, setAnalytics] = useState([])
    const [modal, setModal] = useState(false)
    const [modalmsg, setModalmsg] = useState(false)
    const [status, setStatus] = useState(true)

    useEffect(() => {
        
        axios.all([axios.get("/api2/baseline_bak"), axios.get("/api2/chart"), axios.get("/api2/analytics")])
            .then((response) => {
                setTimeout(() => {
                    setActivities(response[0].data)
                    setOverview(response[1].data.slice(-5))
                    setAnalytics(response[2].data)
                    setLoading(false)
                }, 1000)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [modal])


    if (isloading) {
        return <Loader />
    }

    return (
        <div className='home'>
            <Modal modal={modal} setModal={setModal} modalmsg={modalmsg} status={status}/>
            <Analytics analytics={analytics} />
            <div className='home__row'>
                <Activities activities={activities} setModal={setModal} setModalmsg={setModalmsg} setStatus={setStatus}/>
                <Overview overview={overview} />
            </div>
        </div>
    )
}
