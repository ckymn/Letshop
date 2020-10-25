// --- ilk reducer (REDUCER)
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

// varsayilan state degerleri
function changeCategoryReducer (state = initialState.currentCategory, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return action.payload //kendi state`imiz budur actiondan geliyor

    default:
      return state
  }
}

export default changeCategoryReducer
