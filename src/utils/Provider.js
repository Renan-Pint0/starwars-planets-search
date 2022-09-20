import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const endpoint = 'https://swapi.dev/api/planets';
  const [planets, setPlanets] = useState(['']);
  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((Response) => Response.json());
      results.map((result) => delete result.residents);
      setPlanets(results);
    };
    getPlanets();
  }, []);
  const contextValue = {
    planets,
    setPlanets,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
