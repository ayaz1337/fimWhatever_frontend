import React from 'react';
import Error404img from '../assets/b9d306d.png';
import './styles/Error404.scss';

export default function Error404() {
  return (
    <div className='error__404'>
      <img className='error__404__img' src={Error404img} alt=""></img>
    </div>
  )
}
