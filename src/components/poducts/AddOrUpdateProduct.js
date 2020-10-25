import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux' //burda Redux‘a baglanmak
import { getCategories } from '../../redux/actions/categoryActıons'
import { saveProduct } from '../../redux/actions/productAction'
import ProductDetail from './ProductDetail'

function AddOrUpdateProduct ({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props // mevcut prop‘lari gentisletmek anlamina gelir
}) {
  const [product, setProduct] = useState({ ...props.product })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }

    setProduct({ ...props.product })
  }, [props.product])

  function handleChange (event) {
    const { name, value } = event.target
    // burda ...previousProduct ile eskileri kopyalayip uzerine yenilerini eklemeyi sagliyor
    setProduct(previousProduct => ({
      ...previousProduct,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value
    }))
    // burda hata islemleri
    if (name === 'productName' && value === '') {
      setErrors(previousErrors => ({
        ...previousErrors,
        productName: 'Urun ismi Olmalidir'
      }))
    } else {
      setErrors(previousErrors => ({
        ...previousErrors,
        productName: ''
      }))
    }
  }

  function handleSave (event) {
    event.preventDefault()
    saveProduct(product).then(() => {
      history.push('/')
    })
  }

  // Burda (componentWillDidMount) 'islem bitince sonlandirma islemi' yapar ve ProductDetail e parametreleri yollar
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  )
}

export function getProductById (products, productId) {
  let product = products.find(product => product.id == productId) || null
  return product
}

// Burda HOOK yardimi ile Redux ile React "State"leri cektiyoruz
function mapStateToProps (state, ownProps) {
  const productId = ownProps.match.params.productId
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {}
  return {
    product: product,
    products: state.productListReducer,
    categories: state.categoryListReducer
  }
}

// Burda HOOK yardimi ile Redux`a ile React "Action" baglantisi Yaptik
const mapDispatchToProps = {
  getCategories,
  saveProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct)
