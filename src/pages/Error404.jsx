import React from 'react';
import Error404img from '../assets/b9d306d.png';
import './styles/Error404.scss';
import { motion } from 'framer-motion';

export default function Error404() {
  return (
    // <motion.div initial={{y: "-100vh", opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.5, type: "spring", ease: "easeInOut"}}
    <div className='error__404'>
      <img className='error__404__img' src={Error404img} alt=""></img>
    </div>
    // </motion.div>
  )
}
