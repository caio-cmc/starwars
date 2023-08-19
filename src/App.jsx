import React from 'react';
import FilterPlanets from './components/FilterPlanets';
import SearchInput from './components/SearchInput';
import RemoveButton from './components/RemoveButton';
import Table from './components/Table';
import StarProvider from './contexts/StarProvider';
import SortPlanets from './components/SortPlanets';
import StarLogo from './images/star-wars-logo.png';
import './styles/General.scss';

function App() {
  return (
    <body className='main-page'>
      <div className='main-content'>
        <img src={ StarLogo } alt='star wars logo' className='main-title' />
        <StarProvider>
          <div className='main-inputs'>
            <SearchInput />
            <div className='main-filters'>
              <FilterPlanets />
              <SortPlanets />
            </div>
            <RemoveButton />
          </div>
          <Table />
        </StarProvider>
      </div>      
    </body>
  );
}

export default App;
