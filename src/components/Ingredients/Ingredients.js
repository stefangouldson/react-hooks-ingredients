import React, { useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default: 
      throw new Error('Should not get there');
  }
}

const Ingredients = () => {
  const [ingredients, ingredientsDispatch] = useReducer(ingredientReducer, []);

  const addIngredientHandler = ingredient => {
    ingredientsDispatch({type: 'ADD', ingredient: { id: Math.random().toString(), ...ingredient}})
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} /> 
     </section>
    </div>
  );
}

export default Ingredients;
