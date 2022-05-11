import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './styles/Overview.scss';

export default function RootOverview({ overview }) {
  return (
    <motion.div
      className='overview'
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.3 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          isAnimationActive={true}
          width={300}
          height={500}
          data={overview}
          stroke="#fffff"
          fill="#fffff"
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="" />
          <YAxis />
          <Tooltip cursor={false} />
          <Legend />
          <Bar dataKey="baseline" fill="#fda085" animationBegin={1000} animationDuration={500} />
          <Bar dataKey="alerts" fill="#F3797E" animationBegin={1500} animationDuration={500} />
          <Bar dataKey="scans" fill="#4facfe" animationBegin={1500} animationDuration={500} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}