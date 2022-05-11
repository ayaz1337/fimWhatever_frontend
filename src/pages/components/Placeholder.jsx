import axios from 'axios';
import React, { useState } from 'react';
import './styles/Placeholder.scss';
import Loader from './Loader';
import { useEffect } from 'react';

export default function Placeholder() {
  const [temp, setTemp] = useState(null)
  const [isloading, setLoading] = useState(true)
  const [cve, setCve] = useState("CVE-2017-5196")
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    console.log(cve)
    axios.get(`/api/cve/${cve}`)
    .then((response) => {
      console.log(response.data['capec'][0])
      setTemp(response.data['capec'][0]['summary'])
      setLoading(false)
      setCve(`CVE-${Math.floor(Math.random() * (2021 - 2016) + 2016)}-5196`)
      })
  }, [refresh])

  const handleClick= () => {
    refresh ? setRefresh(false) : setRefresh(true)
  }

  if (isloading) {
    return <Loader />
  }
  return (
    <div className="placeholder">
      {cve}<br></br><br></br>
      {temp}<br></br><br></br>
      <button onClick={handleClick}>refresh</button>
    </div>
  )
}
