import React from 'react';
import { MdOutlineReportProblem, MdPodcasts, MdOutlineShield, MdRadar } from 'react-icons/md';
import './styles/Analytics.scss';
import { motion } from 'framer-motion';



export default function Analytics({ analytics }) {

  const cardVariant1 = {
    hidden: { opacity: 0, y: "-200px" },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }
  const cardVariant2 = {
    hidden: { opaccity: 0, y: "200px" },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }
  const cardVariant3 = {
    hidden: { opaccity: 0, y: "-200px" },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }
  const cardVariant4 = {
    hidden: { opaccity: 0, y: "200px" },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }

  return (
    <div className='analytics'>
      <motion.div className='analytics__card baseline' variants={cardVariant1} initial="hidden" animate="visible">
        <h1>{analytics.length === 0 ? 0 : analytics['baseline']}</h1>
        <div>
          <MdPodcasts />
          <h3>Files are being monitored</h3>
        </div>
      </motion.div>
      <motion.div className='analytics__card compromises' variants={cardVariant2} initial="hidden" animate="visible">
        <h1>{analytics.length === 0 ? 0 : analytics['alerts']}</h1>
        <div>
          <MdOutlineReportProblem />
          <h3>Potential compromises</h3>
        </div>
      </motion.div>
      <motion.div className='analytics__card protected' variants={cardVariant3} initial="hidden" animate="visible">
        <h1>{analytics.length === 0 ? 0 : analytics['encs']}</h1>
        <div>
          <MdOutlineShield />
          <h3>Files are being protected</h3>
        </div>
      </motion.div>
      <motion.div className='analytics__card scans' variants={cardVariant4} initial="hidden" animate="visible">
        <h1>{analytics.length === 0 ? 0 : analytics['scans']}</h1>
        <div>
          <MdRadar />
          <h3>Scans were conducted</h3>
        </div>
      </motion.div>
    </div>
  )
}
