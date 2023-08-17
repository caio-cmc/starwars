import React, { useContext, useEffect } from 'react';
import StarContext from '../contexts/StarContext';

function SearchInput() {
  const { setData, dataFilter, filterByName,
    setFilterByName } = useContext(StarContext);

  const handleChange = ({ target }) => {
    setFilterByName(target.value);
  };

  useEffect(() => {
    function listUpdate() {
      setData(dataFilter);
      const updatedList = dataFilter.filter((planet) => planet.name
        .toLowerCase().includes(filterByName.toLowerCase()));
      setData(updatedList);
    }
    listUpdate();
  }, [dataFilter, filterByName, setData]);

  return (
    <div>
      <input
        type="text"
        value={ filterByName }
        onChange={ handleChange }
        placeholder="Filtrar por nome"
        data-testid="name-filter"
      />
    </div>
  );
}

export default SearchInput;
