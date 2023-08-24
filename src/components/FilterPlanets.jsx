import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/FilterPlanets.scss';

function FilterPlanets() {
  const {
    data,
    setData,
    setDataFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    currentFilter,
    filterOpt,
    setFilterOpt,
    setCurrentFilter,
    setIsFiltering,
  } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setCurrentFilter({ ...currentFilter, [target.id]: target.value });
  };

  const updateOpts = () => {
    const { column } = currentFilter;
    const newOpts = filterOpt.filter(opt => column !== opt.value);
    if (newOpts.length > 0) {
      setCurrentFilter({
        column: newOpts[0].value, comparison: 'greater than', value: 0,
      })
    } else {
      setCurrentFilter({
        column: '', comparison: 'greater than', value: 0,
      })
    }
    setFilterOpt(newOpts);
  }

  const applyFilter = () => {
    const { column, comparison, value } = currentFilter;
    setFilterByNumericValues([...filterByNumericValues, currentFilter]);
    if (comparison === 'greater than') {
      const filteredData = data.filter((planet) => planet[column]
        > parseInt(value, 10));
      setData(filteredData);
      setDataFilter(filteredData);
    } else if (comparison === 'less than') {
      const filteredData = data.filter((planet) => planet[column]
        < parseInt(value, 10));
      setData(filteredData);
      setDataFilter(filteredData);
    } else {
      const filteredData = data.filter((planet) => planet[column]
        === value);
      setData(filteredData);
      setDataFilter(filteredData);
    }
    updateOpts();
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
        { filterOpt.map((opt) =>
          filterByNumericValues.some((each) => each.column === opt.value)
          ? null : <option value={ opt.value }>{ opt.name }</option>) }
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
        disabled={ filterOpt.length > 0 ? false : true }
      >
        Filter
      </button>
    </div>
  );
}

export default FilterPlanets;
