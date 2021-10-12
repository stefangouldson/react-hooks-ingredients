import React, { useReducer, useCallback, useMemo } from 'react';

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

// Example only

const httpReducer = (currentHttpState, action) => {
  switch (action.type){
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.error }
    default: 
      throw new Error('Should not get there');
  }
}

const Ingredients = () => {
  const [ ingredients, ingredientsDispatch ] = useReducer(ingredientReducer, []);
  const [ httpState, httpDispatch ] = useReducer(httpReducer, {loading: false, error: null});

  const addIngredientHandler = useCallback(ingredient => {
    httpDispatch({type: 'SEND'});
    // set timeout as example
    setTimeout(() => {
      ingredientsDispatch({type: 'ADD', ingredient: { id: Math.random().toString(), ...ingredient}});
      httpDispatch({type: 'RESPONSE'});
    }, 1000)
  }, [])

  const deleteIngredientHandler = useCallback(id => {
    httpDispatch({type: 'SEND'});
    ingredientsDispatch({type: 'DELETE', id: id});
    httpDispatch({type: 'RESPONSE'});
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={deleteIngredientHandler} />
  }, [ingredients, deleteIngredientHandler])

  return (
    <div className="App">
      {httpState.loading ? <h1 style={{textAlign: 'center'}}>Loading...</h1> : (
      <>
        <IngredientForm onAddIngredient={addIngredientHandler} />

        <section>
          <Search />
          {ingredientList}
        </section>
      </>
      )}
    </div>
  );
}

export default Ingredients;
