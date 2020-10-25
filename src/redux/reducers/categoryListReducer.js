// --- yeni bir (REDUCER)
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

// Api den donen degerleri kontrol eder
function changeCategoryReducer (state = initialState.categories, action) {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return action.payload //kendi state`imiz budur actiondan geliyor

    default:
      return state
  }
}

export default changeCategoryReducer
