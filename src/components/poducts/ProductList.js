import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Table } from 'reactstrap'
import * as productActions from '../../redux/actions/productAction'
import * as cartActions from '../../redux/actions/cartActions'
import { bindActionCreators } from 'redux'
import alertify from 'alertifyjs'
import {Link} from 'react-router-dom'

class ProductList extends Component {
  // burda veriiler sunucudan alinip tarayicida calismadan once tekrar calistirilmasi(iki kere render())
  componentDidMount () {
    this.props.actions.getProducts()
  }
  addToCart = (product)=>{
    this.props.actions.addToCart({quantity:1,product}) //cartItem dedigim sey bu olacak
    alertify.success(product.productName+ 'sepete eklendi',[1] )
  }
  render () {
    return (
      <div>
        <h3>
          <Badge color='warning'>Products</Badge>
          <Badge color='success'>
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity PerUnit</th>
              <th>Unit Price</th>
              <th>Unit In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr>
                <th scope='row'>{product.id}</th>
                <td><Link to={'/saveProduct/'+product.id}>{product.productName}</Link></td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button color='success' onClick={()=>this.addToCart(product)}>
                    Ekle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

// ---> State‘leri(data) Prop‘lara(CategoryList) baglanma
function mapStateToPorps (state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer //burda Redux‘tan gelen datayi bu componentin props‘larina atma islemi
  }
}
// ---> ACTION‘lara baglanma {distpatch==action}
function mapDispatchToProps (dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch), //api yi yakalar
      addToCart: bindActionCreators(cartActions.addToCart, dispatch) //ekle butonu aksiyonu
    }
  }
}

export default connect(mapStateToPorps, mapDispatchToProps)(ProductList)
