import React, { useContext, useEffect } from 'react';
import StarContext from '../contexts/StarContext';
import BB8 from '../images/bb8-loading.gif';
import '../styles/Components/Loading.scss';

function Loading() {
  const { loadDots, setLoadDots } = useContext(StarContext);

  useEffect(() => {
    const addingDots = setInterval(() => {
      setLoadDots(prevLoadDots => {
        if (prevLoadDots === 'LOADING....') {
          return 'LOADING';
        } else {
          return prevLoadDots + '.';
        }
      });
    }, 800);

    return () => clearInterval(addingDots);
  }, [setLoadDots]);

  return (
    <div className='loading-general'>
      <img src={ BB8 } alt='BB-8 loading' className='loading-bb8' />
      <h1 className='loading'>{ loadDots }</h1>
    </div>
  );
}

export default Loading;
