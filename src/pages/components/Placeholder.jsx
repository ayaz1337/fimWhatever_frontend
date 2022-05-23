import axios from 'axios';
import React, { useState } from 'react';
import './styles/Placeholder.scss';
import Loader from './Loader';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';
import CardImg1 from '../../../src/assets/convert1.png';
import CardImg2 from '../../../src/assets/convert2.png';
import CardImg3 from '../../../src/assets/convert3.png';
import CardImg4 from '../../../src/assets/convert4.png';
import CardImg5 from '../../../src/assets/convert5.png';
import CardImg6 from '../../../src/assets/convert6.png';
import CardImg7 from '../../../src/assets/convert7.png';
import CardImg8 from '../../../src/assets/convert8.png';


const img = [CardImg1, CardImg2, CardImg3, CardImg4, CardImg5, CardImg6, CardImg7, CardImg8]

export default function Placeholder() {
  const [isloading, setLoading] = useState(true)
  const [data, setData] = useState({
    "img": "CardImg1",
    "cve": "2016-5195",
    "name": "Leveraging Race Conditions",
    "summary": "The adversary targets a race condition occurring when multiple processes access and manipulate the same resource concurrently, and the outcome of the execution depends on the particular order in which the access takes place. The adversary can leverage a race condition by \"running the race\", modifying the resource and modifying the normal execution flow. For instance, a race condition can occur while accessing a file: the adversary can trick the system by replacing the original file with his version and cause the system to read the malicious file.",
    "solutions": "Use safe libraries to access resources such as files. Be aware that improper use of access function calls such as chown(), tempfile(), chmod(), etc. can cause a race condition. Use synchronization to control the flow of execution. Use static analysis tools to find race conditions. Pay attention to concurrency problems related to the access of resources.",
    "url": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-5195}"
  })


  useEffect(() => {
    axios.get(`/api/cve/CVE-${localStorage.getItem('cve')}`)
      .then((response) => {
        setData({
          ...data,
          ["img"]: img[Math.floor(Math.random() * img.length)],
          ["cve"]: response.data["id"],
          ["name"]: response.data['capec'][0]['name'],
          ["summary"]: response.data['capec'][0]['summary'],
          ["solutions"]: response.data['capec'][0]['solutions'],
          ["url"]: `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${response.data['id']}`
        });
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className='placeholder'>
      <Card sx={{ maxWidth: 550 }} className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={data.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ marginTop: 20 }}>
              {data.cve}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {data.name}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "18px", marginTop: "2rem" }} >
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.summary}
            </Typography>
            <br></br>
            <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "18px" }}>
              Solutions
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginBottom: "2rem" }}>
              {data.solutions}
            </Typography>
            <Typography gutterBottom variant="body2" component="div" style={{ fontSize: "13px", marginBottom: "2rem" }}>
              <Link href={data.url} underline="always">
                {data.url}
              </Link>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div >
  )
}
