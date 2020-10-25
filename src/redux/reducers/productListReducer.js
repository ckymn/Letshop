// --- yeni bir ikinci (REDUCER)
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

function productListReducer (state = initialState.products, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return action.payload //kendi state`imiz budur actiondan geliyor

    default:
      return state
  }
}

export default productListReducer
