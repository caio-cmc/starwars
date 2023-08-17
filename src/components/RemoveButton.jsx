import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';

function RemoveButton() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    setData,
    preFilter,
    setPreFilter } = useContext(StarContext);

  const deleteFilter = ({ target }) => {
    const filterToRemove = filterByNumericValues.filter((info) => info.column
      !== target.id);
    setFilterByNumericValues(filterToRemove);
    setData(preFilter[preFilter.length - 1]);
    const removeLastPosition = preFilter.slice(0, preFilter.length - 1);
    setPreFilter(removeLastPosition);
  };

  return (
    <div>
      {filterByNumericValues.map((each, index) => (
        <div data-testid="filter" key={ index }>
          <span>{`${each.column} ${each.comparison} ${each.value}`}</span>
          <button
            type="button"
            onClick={ deleteFilter }
            id={ each.column }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default RemoveButton;
