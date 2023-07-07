import React from 'react'
import ProductDetails from '../components/Product/ProductDetails';
import Navbar from '../components/General/Navbar';
import Product_Navbar from '../components/General/Product_Navbar';

const ProductDetailsPage = ({currentWidth}) => {
    return (
        <div>
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <ProductDetails/>
        </div>
    )
}

export default ProductDetailsPage