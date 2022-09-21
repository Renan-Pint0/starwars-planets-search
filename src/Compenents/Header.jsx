import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function Header() {
  const { filterByName, setFilterByName } = useContext(AppContext);
  const handleChange = ({ target }) => {
    setFilterByName(target.value);
  };
  return (
    <div>
      <h1>Star Wars Project</h1>
      <input
        type="text"
        name="data-filter"
        id="data-filter"
        value={ filterByName }
        onChange={ handleChange }
        data-testid="name-filter"
        placeholder="Filtro por Planeta"
      />
    </div>
  );
}

export default Header;
