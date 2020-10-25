// yeni bir 4 (REDUCER) state yonetiminin yapildigi yer
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

function cartReducer (state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: // ekleme islemi
      var addItem = state.find(c => c.product.id === action.payload.product.id)
      if (addItem) {
        const newState = state.map(cartItem => {
          /*Burda product yazmamizin sebebi product isminden farkli birsey kaydetmemizdir*/
          if (cartItem.product.id === action.payload.product.id) { 
            return Object.assign(
              {},
              addItem, 
              {quantity: addItem.quantity + 1}
            )
          }
          return cartItem
        })
        return newState
      } else {
        // sepette baslangicta ortak eleman yok ise state`in bir kopyasini al ve action.payload`ini ekle demek
        return [...state, { ...action.payload }] //Redux`ta push() ve pop() operasyonlarini yapmiyoruz
      }
    case actionTypes.REMOVE_FROM_CART: // silme islemi
      const newState2 = state.filter(
        cartItem => cartItem.product.id !== action.payload.id
      )
      return newState2

    default:
      return state
  }
}

export default cartReducer
