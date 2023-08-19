import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/SortPlanets.scss';

function SortPlanets() {
  const { data, setData, order, setOrder } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setOrder({ ...order, [target.name]: target.value });
  };

  const handleSort = () => {
    if (order.sort === 'ASC') {
      const ascNumbers = [...data].sort((a, b) => a[order.column] - b[order.column]);
      setData(ascNumbers);
    } else {
      const descNumbers = [...data].sort((a, b) => b[order.column] - a[order.column]);
      setData(descNumbers);
    }
  };

  return (
    <div className='sort-main'>
      <select className='sort-dropdown' name="column" onChange={ handleChange }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label className="radio-label" htmlFor="ascendente">
        <input
          type="radio"
          value="ASC"
          id="ascendente"
          name="sort"
          className="radio-button asc"
          onClick={ handleChange }
        />
        Ascending
      </label>
      <label className="radio-label" htmlFor="descendente">
        <input
          type="radio"
          value="DESC"
          id="descendente"
          name="sort"
          className="radio-button desc"
          onClick={ handleChange }
        />
        Descending
      </label>
      <button
        className='sort-button'
        type="button"
        onClick={ handleSort }
      >
        Sort
      </button>
    </div>
  );
}

export default SortPlanets;
