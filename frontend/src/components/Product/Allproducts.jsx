import React from 'react'
const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '250',
        label: "Express shipping",
        color: 'Black',
        size: ["XS", "S", "M", "L", "XL", "2XL"]
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '350',
        label: "Bestseller",
        color: 'Black',
        size: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '500',
        label: "Trending",
        color: 'Black',
        size: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '599',
        label: "New arrival",
        color: 'Black',
        size: ["M", "L", "XL"]
    },
    // More products...
]

export default function Allproducts() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-0 pb-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-left font-agdasima">All Products</h2>
                <span className='text-sm mb-5 text-gray-500'>4 items</span>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
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

                            <div className="label mt-3 mb-2 ">
                                <p className='inline-block m-0 uppercase' style={{ letterSpacing: "0.9px", fontSize: "10px", fontWeight: "100", background: "var(--pale-orange)" }}>
                                    {product.label}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text:sm md:text-lg text-gray-800">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
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