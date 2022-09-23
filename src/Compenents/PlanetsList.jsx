import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../utils/AppContext';
import '../css/PlanetsList.css';

function PlanetList() {
  const { planets, setPlanets } = useContext(AppContext);
  const { filterByName } = useContext(AppContext);
  const columnsNames = [
    'orbital_period',
    'population',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    if (filterByName !== '') {
      console.log('p');
      const filteredPlanets = [];
      const data = planets;
      data.filter(
        (planet) => {
          if ((planet.name).toLowerCase().includes(filterByName.toLowerCase())) {
            filteredPlanets.push(planet);
          }
          return filteredPlanets;
        },
      );
      setPlanets(filteredPlanets);
    }
    if (filterByName === '') {
      const getPlanets = async () => {
        const { results } = await fetch('https://swapi.dev/api/planets').then((Response) => Response.json());
        results.map((result) => delete result.residents);
        setPlanets(results);
      };
      getPlanets();
    }
  }, [filterByName]);
  const handleOptions = (option) => (
    !selectedFilters.find((filter) => filter.column === option)
  );
  const handleData = (row) => {
    const filtredData = [];
    selectedFilters.forEach((filter) => {
      switch (filter.condition) {
      case 'maior que':
        filtredData.push(Number(row[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        filtredData.push(Number(row[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        filtredData.push(row[filter.column] === filter.value.toUpperCase());
        break;
      default:
        return true;
      }
    });
    return filtredData.every((planet) => planet);
  };
  const handleChange = ({ target: { name, value } }) => {
    setSelected({ ...selected, [name]: value });
  };
  return (
    <div>
      <div className="filter-class">
        Filtros:
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          value={ selected.column }
          onChange={ handleChange }
        >
          {columnsNames.filter(handleOptions).map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          name="condition"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ selected.condition }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value"
          id="value-filter"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ () => {
            setSelectedFilters([...selectedFilters, selected]);
          } }
        >
          Filtrar
        </button>
        <button
          type="submit"
          data-testid="button-remove-filters"
          onClick={ () => {
            setSelectedFilters([]);
          } }
        >
          Limpar
        </button>
      </div>
      {selectedFilters.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <button
            type="button"
            onClick={ () => {
              const cloneFilters = [...selectedFilters];
              cloneFilters.splice(index, 1);
              setSelectedFilters(cloneFilters);
            } }
          >
            𝙭
          </button>
          <span>
            {filter.column}
            {filter.condition}
            {filter.value}
          </span>
        </div>
      ))}
      <table>
        <tbody>
          <tr>
            {Object.entries(planets[0]).map((planet) => (
              <th key={ planet[0] }>{planet[0]}</th>
            ))}
          </tr>
          {planets
            .filter(handleData)
            .map((planet) => (
              <tr key={ planet.name }>
                {Object.entries(planet).map((planeta) => (
                  <td key={ planeta[1] }>{ planeta[1] }</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default PlanetList;
