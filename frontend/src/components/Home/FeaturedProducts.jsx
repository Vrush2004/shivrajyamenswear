import React from 'react'
import { Fade, AttentionSeeker } from "react-awesome-reveal";
import { selectAllProducts } from '../../Features/product/productSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProducts() {
  const allProducts = useSelector(selectAllProducts);
  const featuredProducts = allProducts.filter((product) => product.label === 'Featured Product');

  const navigate = useNavigate();
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-0 pb-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <AttentionSeeker effect='heartBeat' delay={800}>
          <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-center md:text-left mb-5 font-agdasima">Featured Products</h2>
        </AttentionSeeker>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative" onClick={()=>navigate(`products/${product.id}`)}>
              <Fade delay={800} direction='down' triggerOnce={true}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.brand}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
              </Fade>
              <AttentionSeeker effect='bounce' duration={1000} delay={800}>
                <div className="home-page-product-label mt-3 inline-block m-0 uppercase" style={{ fontSize: "10px" }}>
                  <p className='' style={{}}>
                    {product.label}
                  </p>
                </div>
              </AttentionSeeker>
              <div className="mt-2 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">₹{Math.round(product.price - (product.price * (product.discountPercentage / 100)))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}