import React from 'react';
import BB8 from '../images/bb8-loading.gif';
import '../styles/Components/Loading.scss';

function Loading() {
  return (
    <div className='loading-general'>
      <img src={ BB8 } alt='BB-8 loading' className='loading-bb8' />
      <h1 className='loading'>LOADING....</h1>
    </div>
  );
}

export default Loading;
