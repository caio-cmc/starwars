import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import '../styles/Components/RemoveButton.scss';

function RemoveButton() {
  const {
    ogData,
    setData,
    filterByNumericValues,
    setFilterByNumericValues,
    setIsFiltering,
    filterOpt,
    setFilterOpt
  } = useContext(StarContext);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const createOpt = (column) => {
    const optName = column.includes('_') ? capitalize(column.replace('_', ' ')) : capitalize(column);
    const newOpt = { value: column, name: optName };
    setFilterOpt([...filterOpt, newOpt]);
  };

  const concatFilters = () => {
    const filtLength = filterByNumericValues.length;
  
    if (filtLength === 0) {
      setData(ogData); // Nenhum filtro restante, voltar à tabela original
    } else {
      let filteredData = [...ogData]; // Começar com a tabela original
  
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
  
      setData(filteredData); // Aplicar todos os filtros restantes de uma vez
    }
  };
  
  

  const deleteFilter = ({ target }) => {
    const filterToRemove = filterByNumericValues.filter((info) => info.column
      !== target.id);
    setFilterByNumericValues(filterToRemove);
    createOpt(target.id);
    concatFilters();
    const filtLength = filterByNumericValues.length;
    if (filtLength === 0) {
      setIsFiltering(false);
    }
  };

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
