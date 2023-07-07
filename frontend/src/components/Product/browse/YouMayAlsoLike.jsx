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

export default function YouMayAlsoLike() {
    return (
            <div className="mx-auto px-4 mt-8 mb-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-left">You May Also Like 🥰</h2>
                <div className="mt-3 flex flex-row gap-0 md:gap-12 overflow-x-scroll hide-scrollbar">
                    {products.map((product) => (
                        <div key={product.id} className="p-2 border" style={{width:"100%",background:"var(--light-grayish-blue)"}}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                                
                            </div>

                            <div className="block md:flex justify-between mt-2">
                                <div>
                                    <h3 className="text-sm text-gray-800">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700 mt-1 md:mt-0">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}