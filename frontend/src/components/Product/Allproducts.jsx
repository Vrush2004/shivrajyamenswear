import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllProductsAsync, selectAllProducts, selectedProductCategory } from '../../Features/product/productSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Allproducts() {
    const dispatch = useDispatch();
    const newProducts = useSelector(selectAllProducts);
    const selectedProduct = useSelector(selectedProductCategory);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, [dispatch])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-0 pb-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-left font-agdasima capitalize">{selectedProduct}</h2>
                <span className='text-sm mb-5 text-gray-500'>{newProducts.length} items</span>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {newProducts.map((product) => (
                        <div key={product.id} className="group relative"
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    style={{ left: "82%", background: "white", borderRadius: "50%", padding: ".2rem" }}
                                    strokeWidth={1.8}
                                    stroke="black"
                                    className="w-6 h-6 absolute top-1"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>

                            <div className="mt-3 mb-2 inline-block m-0 uppercase">
                                <p className='label' style={{ letterSpacing: "0.9px", fontSize: "10px", fontWeight: "100", background: "var(--pale-orange)" }}>
                                    {product.brand}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text:sm md:text-lg text-gray-800">
                                        <p>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </p>
                                    </h3>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                </div>
                                <p className="text-sm md:text-lg font-medium text-gray-800">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}