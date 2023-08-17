import React, { Suspense } from 'react'
// import ProductList from '../components/Product/ProductList'
const ProductList = React.lazy(() => import('../components/Product/ProductList'));
import Product_Navbar from '../components/General/Product_Navbar'
import Navbar from '../components/General/Navbar'
import CategoryChips from '../components/Product/CategoryChips'
import DiscountBanner from '../components/Product/DiscountBanner'
import Loader from '../components/General/Loader';
import ScreenViewTracker from '../ScreenViewTracker';

const ProductListPage = ({ currentWidth }) => {
  return (
    <div>
      {/* google analytics */}
      <ScreenViewTracker screenName="ProductListPage" />
      {
        currentWidth < 640 ? <Product_Navbar /> : <Navbar />
      }
      {
        currentWidth < 640 &&
        <div>
          <CategoryChips />
          <DiscountBanner />
        </div>
      }
      <Suspense fallback={<Loader/>}>
        <ProductList currentWidth={currentWidth} />
      </Suspense>
    </div>
  )
}

export default ProductListPage