// burda categoryList ve ProductList componentlerini tek yerde toplamak Routing islemelrini daha kolay yapabilmek
import React, { Component } from 'react'
import { Row ,Col } from 'reactstrap'
import CategoryList from '../categories/CategoryList'
import ProductList from '../poducts/ProductList'

export default class DashBoard extends Component {
  render () {
    return (
      <div>
        <Row>
          <Col xs='3'>
            <CategoryList />
          </Col>
          <Col xs='9'>
            <ProductList />
          </Col>
        </Row>
      </div>
    )
  }
}
