import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './pages/components/Loader';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children }) {
    const [userAuth, setUserAuth] = useState(false)
    const [isloading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api2/verifyuserlogin')
            .then((response) => {
                if (response.status === 200){
                    setUserAuth(true)
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
        userAuth ? children : <Navigate to="/gateway" />
    )
}