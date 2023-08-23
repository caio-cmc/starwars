import React, { useContext, useEffect } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/SearchInput.scss';

function SearchInput() {
  const {
    ogData,
    data,
    setData,
    dataFilter,
    filterByName,
    setFilterByName,
    isFiltering,
    isSearching,
    setIsSearching
  } = useContext(StarContext);

  const handleChange = ({ target }) => {
    const planetName = target.value;
    setFilterByName(planetName);
    if (planetName) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    function listUpdate() {
      if (!isFiltering && !isSearching) {
        setData(ogData);
      } else if (!isFiltering && isSearching) {
        const updatedList = ogData.filter((planet) => planet.name
          .toLowerCase().includes(filterByName.toLowerCase()));
        setData(updatedList);
      } else if (isFiltering && isSearching) {
        const updatedList = dataFilter.filter((planet) => planet.name
          .toLowerCase().includes(filterByName.toLowerCase()));
        setData(updatedList);
      } else if (isFiltering && !isSearching) {
        setData(dataFilter);
      }
    }
    listUpdate();
  }, [data, dataFilter, filterByName, isFiltering, isSearching, ogData, setData]);

  return (
    <div>
      <input
        type="text"
        value={ filterByName }
        onChange={ handleChange }
        placeholder="Search for planets"
        className="search-input"
      />
    </div>
  );
}

export default SearchInput;
