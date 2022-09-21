import React, { useContext, useEffect } from 'react';
import AppContext from '../utils/AppContext';
import '../css/PlanetsList.css';

function PlanetList() {
  const { planets, setPlanets } = useContext(AppContext);
  const { filterByName } = useContext(AppContext);
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
      console.log(filteredPlanets);
      console.log(planets);
    }
    if (filterByName === '') {
      console.log('1');
      const getPlanets = async () => {
        const { results } = await fetch('https://swapi.dev/api/planets').then((Response) => Response.json());
        results.map((result) => delete result.residents);
        setPlanets(results);
      };
      getPlanets();
    }
  }, [filterByName]);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {Object.entries(planets[0]).map((planet) => (
              <th key={ planet[0] }>{planet[0]}</th>
            ))}
          </tr>
          {planets.map((planet) => (
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
