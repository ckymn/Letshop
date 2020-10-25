// ACTION
import * as actionTypes from './actionTypes'

// burda Reducer’a (GET_CATEGORIES_SUCCESS) elimde bu action var ve State degerimiz (payload: products ) tir diyecegiz
export function getProductsSuccess (products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products }
}
// BURDA VERITABANINA EKLEME
export function createProductSuccess (products) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: products } // burasi Reducer`a gondericegimiz obje
}
// BURDA VERITABANINA guncelleme
export function updateProductSuccess (products) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: products } // burasi Reducer`a gondericegimiz obje
}




// --Api`ye Ekleme veya Guncelleme islemleri Altyapisi 
export function saveProductApi (product) {
  return fetch('http://localhost:3000/products/' + (product.id || ''), {
    method: product.id ? 'PUT' : 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(product) //Gonderdigimiz data‘yi String haline cevirip yolluyoruz
  }) 
    .then(handlerResponse)
    .catch(handleError)
}

// POST ve PUT islemlerini Yapma Islemi
export function saveProduct (product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct)) //"PUT"
          : dispatch(createProductSuccess(savedProduct)) //"POST"
      })
      .catch(error => {
        throw error
      })
  }
}

export async function handlerResponse (response) {
  if (response.ok) {
    return response.json()
  }
  const error = await response.text()
  throw new Error(error)
}

export function handleError (result) {
  console.log('Bir Hata Olustu')
  throw result
}

// --Api`yi Getirme islemi
export function getProducts (categoryId) {
  return function (dispatch) {
    let url = 'http://localhost:3000/products/'
    if (categoryId) {
      url = url + '?categoryId=' + categoryId
    }
    return fetch(url)
      .then(response => response.json())
      .then(result => dispatch(getProductsSuccess(result)))
  }
}
