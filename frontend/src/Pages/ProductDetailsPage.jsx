import React,{Suspense} from 'react'
const ProductDetails = React.lazy(()=>import('../components/Product/ProductDetails'))
// import ProductDetails from '../components/Product/ProductDetails';
import Navbar from '../components/General/Navbar';
import Product_Navbar from '../components/General/Product_Navbar';
import YouMayAlsoLike from '../components/Product/browse/YouMayAlsoLike';
import Categories from '../components/Home/Categories';
import { useParams } from 'react-router-dom';
import Footer from '../components/General/Footer';
import Loader from '../components/General/Loader';
import ScreenViewTracker from '../ScreenViewTracker';

const ProductDetailsPage = ({ currentWidth }) => {
    const productId = useParams();
    return (
        <div>
            {/* google analytics */}
             <ScreenViewTracker screenName="ProductDetailsPage" />
             
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <Suspense fallback={<Loader/>}>
            <ProductDetails productId={productId} />
            <div className='mx-auto mt-8 mb-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
                <h2 className="text-xl ml-4 md:text-3xl font-bold text-gray-900 text-left">Shop by categories</h2>
                <Categories />
            </div>
            <Footer/>
            </Suspense>
        </div>
    )
}

export default ProductDetailsPage