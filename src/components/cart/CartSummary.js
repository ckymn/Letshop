// --->> Burda Siparislerin Listesini Goruntulemek istiycez
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../redux/actions/cartActions'
import alertify from 'alertifyjs'

class CartSummary extends Component {
  // sil butonuna tiklayinca
  removeFromCart (product) {
    this.props.actions.removeFromCart(product)
    alertify.error(product.productName + ' Sepetten Silindi' + [2])
  }
  //Sepet Bos iken Gosterilecek Operasyon
  renderEmpty () {
    return (
      <NavItem>
        <NavLink>Sepet Bos</NavLink>
      </NavItem>
    )
  }
  //   Sepette Eleman Var Ise Gosterilecek Operasyon
  renderSummary () {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(cartItem => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}-
              <Badge color='success'>{cartItem.quantity}</Badge> /
              <Badge
                color='danger'
                onClick={() => {
                  this.removeFromCart(cartItem.product)
                }}
              >
                X
              </Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to={'/cart'}>Sepete Git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  render () {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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
export default connect(mapToStateToProps, mapDispatchToProps)(CartSummary)
