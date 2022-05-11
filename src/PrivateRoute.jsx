import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './pages/components/Loader';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {
    const [rootAuth, setRootAuth] = useState(false)
    const [isloading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api2/verifyrootlogin')
            .then((response) => {
                if (response.status === 200){
                    setRootAuth(true)
                    setLoading(false)
                }
            })
            .catch(() => {
                setLoading(false)
              })
    }, [])

    if(isloading){
        return <Loader />
    }
    
    return (
        rootAuth ? children : <Navigate to="/gateway" />
    )
}