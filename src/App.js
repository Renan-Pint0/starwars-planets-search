import React from 'react';
import './App.css';
import PlanetList from './Compenents/PlanetsList';
import Provider from './utils/Provider';

function App() {
  return (
    <Provider>
      <PlanetList />
    </Provider>
  );
}

export default App;
