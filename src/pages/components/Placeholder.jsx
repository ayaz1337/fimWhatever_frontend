import axios from 'axios';
import React, { useState } from 'react';
import './styles/Placeholder.scss';
import Loader from './Loader';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material'
import CardImg1 from '/home/subhadip/Desktop/fimWhatever_v3.0.1/src/assets/aap-new2.png';
import CardImg2 from '/home/subhadip/Desktop/fimWhatever_v3.0.1/src/assets/convert2.png';
import CardImg3 from '/home/subhadip/Desktop/fimWhatever_v3.0.1/src/assets/convert.png';
import Divider from '@mui/material/Divider';


const items = [
  "2016-5195",
  "2019-19781",
  "2018-13379"
]

export default function Placeholder() {
  const [isloading, setLoading] = useState(true)
  const [data, setData] = useState({
    "cve": "",
    "name": "",
    "summary": "",
    "solutions": ""
  })
  const [state, setState] = useState(false)


  useEffect(() => {
    axios.get(`/api/cve/CVE-${items[Math.floor(Math.random() * items.length)]}`)
      .then((response) => {
        setData({
          ...data,
          ["cve"]: response.data["id"],
          ["name"]: response.data['capec'][0]['name'],
          ["summary"]: response.data['capec'][0]['summary'],
          ["solutions"]: response.data['capec'][0]['solutions']
        });
        console.log(data)
        setLoading(false)
      })
      .catch((error) => {
        state ? setState(false) : setState(true)
      })
  }, [state])


  if (isloading) {
    return <Loader />
  }
  return (
    <div className='placeholder'>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={CardImg1}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.cve}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {data.name}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="h6" component="div" style={{fontSize: "18px", marginTop: "1rem"}} >
              Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.summary}
            </Typography>
            <br></br>
            <Typography gutterBottom variant="h6" component="div" style={{fontSize: "18px"}}>
              Solutions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.solutions}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div >
  )
}
