// --->Burda Sepete Detayini cagiricaz
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../redux/actions/cartActions'
import { Table, Button } from 'reactstrap'
import alertify from 'alertifyjs'

class CartDetail extends Component {
  // sil butonuna tiklayinca
  removeFromCart (product) {
    this.props.actions.removeFromCart(product)
    alertify.error(product.productName + ' Sepetten Silindi' + [2])
  }

  render () {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(cartItem => (
              <tr>
                <th scope='row'>{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color='danger'
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    Sil
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
function mapToStateToProps (state) {
  return {
    cart: state.cartReducer
  }
}
// ---> ACTION‘lara baglanma {distpatch==action}
function mapDispatchToProps (distpatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, distpatch)
    }
  }
}

// connect() yardimi ile State(data)`yi bu Component`in Prop`larina dahil etmem gerekiyor
export default connect(mapToStateToProps, mapDispatchToProps)(CartDetail)
