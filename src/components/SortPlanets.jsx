import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';

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
    <div>
      <select data-testid="column-sort" name="column" onChange={ handleChange }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ascendente">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ascendente"
          name="sort"
          onClick={ handleChange }
        />
        Ascendente
      </label>
      <label htmlFor="descendente">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="descendente"
          name="sort"
          onClick={ handleChange }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortPlanets;
