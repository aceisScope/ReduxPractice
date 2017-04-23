import * as types from './types';
import Api from '../lib/api';

export function addRecipe() {
  return {
    type: types.ADD_RECIPE,
  }
}

export function fetchRecipes(ingredients) {
  return (dispatch, getState) => {
    const params = [
      `i=${encodeURIComponent(ingredients)}`,
      'p=3'
    ].join('&');
    return Api.get(`/api/?${params}`).then(resp => {
      console.log(resp);
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}
