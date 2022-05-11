import { motion } from 'framer-motion';
import React from 'react';
import './styles/Profile.scss';

const cardVariant1 = {
  hidden: { opacity: 0, y: "-500px" },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}
const cardVariant2 = {
  hidden: { opaccity: 0, y: "500px" },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

export default function RootProfile() {
  return (
    <div className='profile'>
      <motion.div
        className="info"
        variants={cardVariant1}
        initial="hidden"
        animate="visible">
        Profile
      </motion.div>

      <motion.div 
      className='update__details'
      variants={cardVariant2}
      initial="hidden"
      animate="visible">
        Profile
      </motion.div>
    </div>
  )
}
