import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/RemoveButton.scss';

function RemoveButton() {
  const {
    ogData,
    filterByNumericValues,
    setFilterByNumericValues,
    setData,
    setIsFiltering
  } = useContext(StarContext);

  const deleteFilter = ({ target }) => {
    const filterToRemove = filterByNumericValues.filter((info) => info.column
      !== target.id);
    setFilterByNumericValues(filterToRemove);
    setData(ogData);
    setIsFiltering(false);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      {filterByNumericValues.map((each, index) => (
        <div className='remove-main' key={ index }>
          <span className='remove-text'>{`${each.column.includes('_') ? capitalize(each.column.replace('_', ' ')) : capitalize(each.column) } ${each.comparison} ${each.value}`}</span>
          <button
            className='remove-button'
            type="button"
            onClick={ deleteFilter }
            id={ each.column }
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default RemoveButton;
