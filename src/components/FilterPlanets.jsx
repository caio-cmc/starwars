import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';

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
    if (comparison === 'maior que') {
      filteredData = data.filter((planet) => planet[column]
        > parseInt(value, 10));
      setData(filteredData);
    } else if (comparison === 'menor que') {
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
    <div>
      <select
        data-testid="column-filter"
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
        data-testid="comparison-filter"
        value={ currentFilter.comparison }
        onChange={ handleChange }
        id="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        value={ currentFilter.value }
        onChange={ handleChange }
        type="number"
        id="value"
      />
      <button
        data-testid="button-filter"
        onClick={ applyFilter }
        type="button"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterPlanets;
