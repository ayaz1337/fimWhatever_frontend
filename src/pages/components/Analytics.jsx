import React from 'react';
import { MdOutlineReportProblem, MdPodcasts, MdOutlineShield, MdRadar } from 'react-icons/md';
import './styles/Analytics.scss';
import scrollreveal from 'scrollreveal';



export default function Analytics({ analytics }) {

  React.useEffect(() => {
    const sr = scrollreveal({
      reset: false
    })
    
    
    sr.reveal(`
    .analytics__card:nth-child(1),
    .analytics__card:nth-child(2),
    .analytics__card:nth-child(3),
    .analytics__card:nth-child(4)`, { visibiity: 'hidden', opacity: 0, duration: 1000, interval: 300, scale: 0.5 })
  }, [])

  return (
    <div className='analytics'>
      <div className='analytics__card baseline'>
        <h1>{analytics.length === 0 ? 0 : analytics['baseline']}</h1>
        <div>
          <MdPodcasts />
          <h3>Files are being monitored</h3>
        </div>
      </div>
      <div className='analytics__card compromises'>
        <h1>{analytics.length === 0 ? 0 : analytics['alerts']}</h1>
        <div>
          <MdOutlineReportProblem />
          <h3>Potential compromises</h3>
        </div>
      </div>
      <div className='analytics__card protected'>
        <h1>{analytics.length === 0 ? 0 : analytics['encs']}</h1>
        <div>
          <MdOutlineShield />
          <h3>Files are being protected</h3>
        </div>
      </div>
      <div className='analytics__card scans'>
        <h1>{analytics.length === 0 ? 0 : analytics['scans']}</h1>
        <div>
          <MdRadar />
          <h3>Scans were conducted</h3>
        </div>
      </div>
    </div>
  )
}
