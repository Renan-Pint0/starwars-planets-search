import React from 'react';
import './App.css';
import Header from './Compenents/Header';
import PlanetList from './Compenents/PlanetsList';
import Provider from './utils/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <PlanetList />
    </Provider>
  );
}

export default App;
