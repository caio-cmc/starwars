import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/SortPlanets.scss';

function SortPlanets() {
  const { data, setData, order, setOrder } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setOrder({ ...order, [target.name]: target.value });
  };

  const handleSort = () => {
    const numericValues = data.filter((i) => i[order.column] !== 'unknown');
    const nanValues = data.filter((i) => i[order.column] === 'unknown');
    if (order.sort === 'ASC') {
      const ascNumbers = [...numericValues].sort((a, b) => a[order.column] - b[order.column]);
      nanValues.map(i => ascNumbers.push(i));
      setData(ascNumbers);
    } else {
      const descNumbers = [...numericValues].sort((a, b) => b[order.column] - a[order.column]);
      nanValues.map(i => descNumbers.push(i));
      setData(descNumbers);
    }
  };

  return (
    <div className='sort-main'>
      <select className='sort-dropdown' name="column" onChange={ handleChange }>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation period</option>
        <option value="surface_water">Surface water</option>
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
