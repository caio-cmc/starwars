import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/FilterPlanets.scss';

function FilterPlanets() {
  const {
    data,
    setData,
    filterByNumericValues,
    setFilterByNumericValues,
    currentFilter,
    setCurrentFilter,
    isFiltering,
    setIsFiltering,
  } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setCurrentFilter({ ...currentFilter, [target.id]: target.value });
  };

  const applyFilter = () => {
    const { column, comparison, value } = currentFilter;
    let filteredData;
    setFilterByNumericValues([...filterByNumericValues, currentFilter]);
    if (comparison === 'greater than') {
      filteredData = data.filter((planet) => planet[column]
        > parseInt(value, 10));
      setData(filteredData);
    } else if (comparison === 'less than') {
      filteredData = data.filter((planet) => planet[column]
        < parseInt(value, 10));
      setData(filteredData);
    } else {
      filteredData = data.filter((planet) => planet[column]
        === value);
      setData(filteredData);
    }
    setIsFiltering(true);
  };

  return (
    <div className='filter-main'>
      <select
        className='filter-dropdown'
        value={ currentFilter.column }
        onChange={ handleChange }
        id="column"
      >
        <option value="population">Population</option>
        <option value="orbital_period">Orbital period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation period</option>
        <option value="surface_water">Surface water</option>
      </select>
      <select
        className='filter-dropdown'
        value={ currentFilter.comparison }
        onChange={ handleChange }
        id="comparison"
      >
        <option value="greater than">greater than</option>
        <option value="less than">less than</option>
        <option value="equals">equals</option>
      </select>
      <input
        className='filter-input'
        value={ currentFilter.value }
        onChange={ handleChange }
        type="number"
        id="value"
      />
      <button
        className='filter-button'
        onClick={ applyFilter }
        type="button"
        disabled={ isFiltering }
      >
        Filter
      </button>
    </div>
  );
}

export default FilterPlanets;
