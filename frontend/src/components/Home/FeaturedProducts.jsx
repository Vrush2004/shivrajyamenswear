import React from 'react'
import { Fade, AttentionSeeker } from "react-awesome-reveal";

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    label: "Best Seller"
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    label: "Trending"
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    label: "lowest price"
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    label: "Branded"
  },
  // More products...
]

export default function FeaturedProducts() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-0 pb-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <AttentionSeeker effect='heartBeat' delay={800}>
          <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-center md:text-left mb-5 font-agdasima">Featured Products</h2>
        </AttentionSeeker>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Fade delay={800} direction='down' triggerOnce={true}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
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
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}