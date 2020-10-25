import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as categoryActions from '../../redux/actions/categoryActıons'
import * as productActions from '../../redux/actions/productAction'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

class CategoryList extends Component {
  // burda veriiler sunucudan alinip tarayicida calismadan once tekrar calistirilmasi(iki kere render())
  componentDidMount () {
    this.props.actions.getCategories()
  }

  selectCategory = category => {
    this.props.actions.changeCategory(category)
    this.props.actions.getProducts(category.id)
  }

  render () {
    return (
      <div>
        <h3>
          <Badge color='warning'>Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map(category => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => {
                this.selectCategory(category)
              }}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}
// ---> State‘leri Prop‘lara(CategoryList) baglanma
function mapStateToPorps (state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  }
}
// ---> ACTION‘lari dispatch etmek
function mapDispatchToProps (dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      // burda ise ilk state degerine yonledire yapmasi
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      // burda api yonlendirmesi gerekince
      getProducts: bindActionCreators(
        productActions.getProducts, 
        dispatch) //(dispatch===categoryId) esitttir
    }
  }
}

export default connect(mapStateToPorps, mapDispatchToProps)(CategoryList)
