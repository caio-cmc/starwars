import React, { useContext } from 'react';
import StarContext from '../contexts/StarContext';
import Loading from './Loading';
import '../styles/Components/Table.scss'

function Table() {
  const { data, dateConverter, loading } = useContext(StarContext);

  return (
    <div className='table-general'>
      { loading ? 
        <Loading />
          :
        <table className='table-main'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            { data.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films.map((film) => (
                  <p className='table-film'>{ film }</p>
                )) }</td>
                <td>{ dateConverter(planet.created) }</td>
                <td>{ dateConverter(planet.edited) }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
          </tbody>
        </table>
    }    
    </div>
    
  );
}

export default Table;
