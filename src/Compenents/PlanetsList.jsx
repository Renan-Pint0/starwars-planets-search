import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';
import '../css/PlanetsList.css';

function PlanetList() {
  const { planets } = useContext(AppContext);
  console.log(Object.entries(planets[0]));
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
            <tr key={ planet }>
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
