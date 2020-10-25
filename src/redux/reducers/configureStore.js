// ---(STORE)
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './index'
import thunk from 'redux-thunk'

function configureStore () {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    applyMiddleware(thunk)
    )
}

export default configureStore
// React-Redux‘ta:
/*
   1-actionTypes.js
   2-categoryAction.js
   3-Reducer/xxxx.js
   4-Reducer/index.js
   5-Reducer/Store(configureStore).js
  */
