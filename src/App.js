import React from 'react';
import FilterPlanets from './components/FilterPlanets';
import SearchInput from './components/SearchInput';
import RemoveButton from './components/RemoveButton';
import Table from './components/Table';
import StarProvider from './contexts/StarProvider';
import SortPlanets from './components/SortPlanets';

function App() {
  return (
    <div>
      <h1>Star Wars Project</h1>
      <StarProvider>
        <SearchInput />
        <FilterPlanets />
        <SortPlanets />
        <RemoveButton />
        <Table />
      </StarProvider>
    </div>
  );
}

export default App;
