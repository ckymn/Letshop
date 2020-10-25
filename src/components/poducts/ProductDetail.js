import React from 'react'
import { saveProduct } from '../../redux/actions/productAction'
import SelectInput from '../toolbox/SelectInput'
import TextInput from '../toolbox/TextInput'

function ProductDetail ({ categories, product, onSave, onChange, errors }) {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? 'Guncelle' : 'Ekle'}</h2>

      <SelectInput
        name='categoryId'
        label='Category'
        value={product.categoryId || ''}
        defaultOption='Seciniz'
        options={categories.map(category => ({
          value: category.id,
          text: category.categoryName
        }))}
        onChange={onChange}
        error={errors.categoryId}
      />

      <TextInput
        name='productName'
        label='Product Name'
        value={product.productName}
        onChange={onChange}
        error={errors.productName}
      />

      <TextInput
        name='unitPrice'
        label='Unit Price'
        value={product.unitPrice}
        onChange={onChange}
        error={errors.unitPrice}
      />
      <TextInput
        name='quantityPerUnit'
        label='Quantity Pre Unit'
        value={product.quantityPerUnit}
        onChange={onChange}
        error={errors.quantityPerUnit}
      />
      <TextInput
        name='unitsInStock'
        label='Units In Stock'
        value={product.unitsInStock}
        onChange={onChange}
        error={errors.unitsInStock}
      />
      <button type='submit' className='btn btn-success'>
        Save
      </button>
    </form>
  )
}

export default ProductDetail
