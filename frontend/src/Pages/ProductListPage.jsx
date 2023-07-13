import React from 'react'
import ProductList from '../components/Product/ProductList'
import Product_Navbar from '../components/General/Product_Navbar'
import Navbar from '../components/General/Navbar'
import CategoryChips from '../components/Product/CategoryChips'
import DiscountBanner from '../components/Product/DiscountBanner'

const ProductListPage = ({ currentWidth }) => {
  return (
    <div>
      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      {
        currentWidth < 640 && 
        <div>
          <CategoryChips/>
          <DiscountBanner/>
        </div>
      }
      <ProductList currentWidth={currentWidth} />
    </div>
  )
}

export default ProductListPage