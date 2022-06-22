import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../context/FoodContext';
import CardFood from '../components/cardFood';
import Buttons from '../components/Buttons';

function Foods() {
  const [filter, setFilter] = useState('All');
  const [previousCategory, setPreviousCategory] = useState('');
  const { foods,
    foodsCategories,
    fetchFoodsByCategory,
    fetchMeals } = useContext(FoodContext);
  const NUMBER_OF_FOODS = 12;
  const NUMBER_OF_CATEGORIES = 5;

  useEffect(() => {
    const handleCategory = () => {
      if (filter !== 'All') {
        fetchFoodsByCategory(filter);
      }
      if (filter === 'All' || filter === previousCategory) {
        fetchMeals();
      }
    };
    handleCategory();
  }, [filter]);

  const handleFilter = (name) => {
    if (name !== filter) {
      setFilter(name);
    }
    if (name === filter) {
      setPreviousCategory(name);
      setFilter('All');
    }
  };

  return (
    <div>
      <Header title="Foods" showButton route="food" />
      <Buttons
        name="All"
        dataTestid="All-category-filter"
        onClick={ fetchMeals }
      />
      {
        foodsCategories && foodsCategories
          .slice(0, NUMBER_OF_CATEGORIES).map((categories) => (
            <Buttons
              key={ categories.strCategory }
              name={ categories.strCategory }
              dataTestid={ `${categories.strCategory}-category-filter` }
              onClick={ ({ target }) => handleFilter(target.name) }
            />))
      }
      { foods && foods.slice(0, NUMBER_OF_FOODS).map((food, index) => (
        <CardFood
          key={ food.idMeal }
          food={ food }
          srcImg={ food.strMealThumb }
          alt={ food.strMeal }
          name={ food.strMeal }
          dataTestIdCard={ `${index}-recipe-card` }
          dataTestIdImg={ `${index}-card-img` }
          dataTestIdName={ `${index}-card-name` }
        />
      ))}
      <Footer />
    </div>
  );
}

export default Foods;
