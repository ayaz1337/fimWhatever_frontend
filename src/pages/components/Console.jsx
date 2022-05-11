import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './styles/Console.scss';
import PrivateRoute from '../../PrivateRoute';

export default function Console() {
  const [users, setUsers] = useState([])
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api2/users')
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])

  if (isloading) {
    return <Loader />
  }

  return (
    <PrivateRoute>
      <div className='console'>
        
      </div>
    </PrivateRoute>
  )
}