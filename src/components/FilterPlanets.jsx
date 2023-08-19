import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/FilterPlanets.scss';

function FilterPlanets() {
  const {
    data,
    setData,
    setPreFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    currentFilter,
    setCurrentFilter } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setCurrentFilter({ ...currentFilter, [target.id]: target.value });
  };

  const applyFilter = () => {
    setPreFilter((oldArray) => [...oldArray, data]);
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
  };

  return (
    <div className='filter-main'>
      <select
        className='filter-dropdown'
        value={ currentFilter.column }
        onChange={ handleChange }
        id="column"
      >
        {filterByNumericValues.some((each) => each.column === 'population')
          ? null : <option value="population">population</option>}
        {filterByNumericValues.some((each) => each.column === 'orbital_period')
          ? null : <option value="orbital_period">orbital_period</option>}
        {filterByNumericValues.some((each) => each.column === 'diameter')
          ? null : <option value="diameter">diameter</option>}
        {filterByNumericValues.some((each) => each.column === 'rotation_period')
          ? null : <option value="rotation_period">rotation_period</option>}
        {filterByNumericValues.some((each) => each.column === 'surface_water')
          ? null : <option value="surface_water">surface_water</option>}
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
      >
        Filter
      </button>
    </div>
  );
}

export default FilterPlanets;
