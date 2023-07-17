import React from 'react'
import ProductDetails from '../components/Product/ProductDetails';
import Navbar from '../components/General/Navbar';
import Product_Navbar from '../components/General/Product_Navbar';
import YouMayAlsoLike from '../components/Product/browse/YouMayAlsoLike';
import Categories from '../components/Home/Categories';
import { useParams } from 'react-router-dom';
import Footer from '../components/General/Footer';

const ProductDetailsPage = ({ currentWidth }) => {
    const productId = useParams();
    console.log(productId);
    return (
        <div>
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <ProductDetails productId={productId} />
            {/* <YouMayAlsoLike /> */}
            <div className='mx-auto mt-8 mb-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
                <h2 className="text-xl ml-4 md:text-3xl font-bold text-gray-900 text-left">Shop by categories</h2>
                <Categories />
            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetailsPage