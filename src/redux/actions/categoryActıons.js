// --(ACTION)
import * as actionTypes from './actionTypes'

export function changeCategory (category) {
  return { 
    type: actionTypes.CHANGE_CATEGORY,
     payload: category 
    }
}

// burda Reducer’a (GET_CATEGORIES_SUCCESS) elimde bu action var ve State degerimiz (payload: categories ) bu diyecegiz
export function getCategoriesSucces (categories) { //obje return 
  return { 
    type: actionTypes.GET_CATEGORIES_SUCCESS, 
    payload: categories
   }
}

// ---> burda Api ye baglanmamizi saglar
export function getCategories () { //fonskiyon retun 
  return function (dispatch) {
    let url = 'http://localhost:3000/categories'
    return fetch(url)
      .then(response => response.json())
      .then(result => dispatch(getCategoriesSucces(result)))
  }
}
