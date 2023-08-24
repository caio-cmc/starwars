import React, { useContext, useEffect } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/FilterPlanets.scss';

function FilterPlanets() {
  const {
    ogData,
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
    setFilterByNumericValues([...filterByNumericValues, currentFilter]);
    updateOpts();
    setIsFiltering(true);
  };

  useEffect(() => {
    const concatFilters = () => {
      const filtLength = filterByNumericValues.length;
      if (filtLength === 0) {
        setData(ogData);
      } else {
        let filteredData = ogData;
        filterByNumericValues.forEach((filt) => {
          const { column, comparison, value } = filt;
          if (comparison === 'greater than') {
            filteredData = filteredData.filter((planet) => planet[column] > parseInt(value, 10));
          } else if (comparison === 'less than') {
            filteredData = filteredData.filter((planet) => planet[column] < parseInt(value, 10));
          } else {
            filteredData = filteredData.filter((planet) => planet[column] === value);
          }
        });
        setData(filteredData);
        setDataFilter(filteredData);
      }
    };
    concatFilters();
  }, [filterByNumericValues, ogData, setData, setDataFilter]);

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
