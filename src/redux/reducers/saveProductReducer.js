// --- error da kullanilacak (REDUCER)
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

function saveProductReducer (state = initialState.savedProduct, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return action.payload //kendi state`imiz budur actiondan geliyor
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return action.payload //kendi state`imiz budur actiondan geliyor

    default:
      return state
  }
}

export default saveProductReducer
