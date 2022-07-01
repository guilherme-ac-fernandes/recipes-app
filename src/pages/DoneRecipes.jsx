import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import styles from '../styles/DoneRecipes.module.css';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(recipes);
  }, []);

  const handleAllFilter = () => {
    setCompletedRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  const handleFoodFilter = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredRecipes = recipes.filter((recipe) => recipe.type === 'food');
    setCompletedRecipes(filteredRecipes);
  };

  const handleDrinkFilter = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredRecipes = recipes.filter((recipe) => recipe.type === 'drink');
    setCompletedRecipes(filteredRecipes);
  };

  return (
    <div className={ styles.doneRecipes }>
      <Header title="Done Recipes" showButton={ false } route="null" />
      <nav>
        <Buttons
          dataTestid="filter-by-all-btn"
          name="All"
          onClick={ handleAllFilter }
          className={ styles.allButton }
        />
        <Buttons
          dataTestid="filter-by-food-btn"
          name="Food"
          onClick={ handleFoodFilter }
          className={ styles.button }
        />
        <Buttons
          dataTestid="filter-by-drink-btn"
          name="Drink"
          onClick={ handleDrinkFilter }
          className={ styles.button }
        />
      </nav>
      <section>
        {(completedRecipes || []).map((recipe, index) => (
          <div key={ recipe.id } className={ styles.doneRecipesCards }>
            <div className={ styles.parte1 }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <aside>
                {recipe.type === 'food' && (recipe.tags || []).map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    className={ styles.tags }
                  >
                    {tag}
                  </p>
                ))}
              </aside>
            </div>
            <div className={ styles.parte2 }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <h4
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h4>
              </Link>

              {recipe.type === 'food' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              )}

              {recipe.type === 'drink' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </p>
              )}

              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>

              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  setWasCopied(true);
                } }
                src={ shareIcon }
                alt="shareIcon"
                style={ { width: '15px' } }
              />
              {wasCopied && (
                <p
                  data-testid={ `${index}-horizontal-share-btn` }
                  style={ { fontSize: '12px' } }
                >
                  Link copied!
                </p>
              )}

            </div>

          </div>
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
