import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [route, setRoute] = useState('food');

  const contextValue = {
    food,
    setFood,
    drinks,
    setDrinks,
    route,
    setRoute,
  };

  return (
    <FoodContext.Provider value={ contextValue }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
