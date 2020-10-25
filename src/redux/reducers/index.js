// burda REDUCER`lari combine edicez
import { combineReducers } from 'redux'
import changeCategoryReducer from './changeCategoryReducer'
import categoryListReducer from './categoryListReducer'
import productListReducer from './productListReducer'
import cartReducer from './cartReducer'
import savedProductReducer from './saveProductReducer'

const rootReducer = combineReducers({
  changeCategoryReducer: changeCategoryReducer,
  categoryListReducer: categoryListReducer,
  productListReducer: productListReducer,
  cartReducer: cartReducer,
  savedProductReducer
})

export default rootReducer
