import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [preFilter, setPreFilter] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    column: 'population', comparison: 'greater than', value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population', sort: 'ASC',
  });
  const [loading, setLoading] = useState(true);
  const [loadDots, setLoadDots] = useState('LOADING');
  const minusOne = -1;
  const one = 1;

  // sort da linha 27: -1 representa a ordem crescente e 1 a decrescente
  useEffect(() => {
    async function fetchPlanets() {
      const promise = await fetch('https://swapi.dev/api/planets/');
      const json = await promise.json();
      const planetsArray = json.results;
      planetsArray.sort((a, b) => (a.name < b.name ? minusOne : one));
      setData(planetsArray);
      setDataFilter(planetsArray);
      setLoading(false);
    }

    fetchPlanets();
  }, [minusOne]);

  const dateConverter = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const formatedDate = `${day}/${month}/${year}`
    return formatedDate;
  }

  const starValue = {
    data,
    setData,
    dataFilter,
    setDataFilter,
    preFilter,
    setPreFilter,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    currentFilter,
    setCurrentFilter,
    order,
    setOrder,
    loading,
    loadDots,
    setLoadDots,
    dateConverter
  };

  return (
    <StarContext.Provider value={ starValue }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;