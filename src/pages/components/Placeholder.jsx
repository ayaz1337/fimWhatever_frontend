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



const img = [
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/cdn.filestackcontent.com/E36hbutZSviV09P3jLn3',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/ca913777c7834117921514f999bce5f1/987a11780f304270b1ff713ceed7517e',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/956925ec734a46efbb0ac43c562eeff1/5d0949b474054798bee6d56f5e19b64d',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/cea96d685f35459ca89c69b7212687f1/2d37f6d87efc454499a71894d3e762b0',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/a748e3ca7d024358970ad77d2c73f3f1/296a2b34f81544bfbbb1c4cf043c0db8',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/a625eecc19d74664a41728c4047497f1/f017cfd1161b4a0ca5dc8fb5a54219ed',
  'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https:/file-uploads.teachablecdn.com/5b4e4571eb7c47c89be66aa7072598f1/9d2f1c4df3ee4596b027badc6f723b5b'
]

export default function Placeholder() {
  const [isloading, setLoading] = useState(true)
  const [data, setData] = useState({})


  useEffect(() => {
    axios.get(`/api2/cve/CVE-${localStorage.getItem('cve')}`)
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
