import React from 'react'
import Shirt from '../../assets/shirt.jpg';
import Tshirt from '../../assets/tshirt.jpg';
import jeans from '../../assets/jeans.jpg';
import sweatshirt from '../../assets/sweatshirt.jpg';
import accessories from '../../assets/accessories.jpg';
import shoes from '../../assets/shoes.jpg';
import jacket from '../../assets/jackets.jpg';

const categories = [
    { name: "Shirts", img: Shirt, link: '/category/shirt' },
    { name: "Jeans", img: jeans, link: '/category/jeans' },
    { name: "T-Shirts", img: Tshirt, link: '/category/tshirt' },
    { name: "SweatShirt", img: sweatshirt, link: '/category/sweatshirt' },
    { name: "Accessories", img: accessories, link: '/category/accessories' },
    { name: "Jacket", img: jacket, link: '/category/jacket' },
    { name: "Shoes", img: shoes, link: '/category/shoes' },
];

const CategoryChips = () => {
    return (
        <div className='category-wrapper px-4 py-6 md:px-16 md:pb-2 md:pt-5'>
            <div className="category-container flex flex-row gap-3 md:gap-12 overflow-x-scroll hide-scrollbar">
                {
                    categories.map((category, index) =>
                        <div key={index} class="relative inline-block select-none whitespace-nowrap rounded-full px-4 py-3 align-baseline text-xs font-bold uppercase leading-none border border-orange-900">
                            <div class="absolute top-2/4 left-0 h-8 w-8 -translate-y-2/4">
                                <img
                                    alt="candice wu"
                                    src={category.img}
                                    class="relative inline-block  h-8 w-8 translate-x-px translate-y-px rounded-full object-cover object-center"
                                />
                            </div>
                            <div class="ml-6 mt-px">
                                <p class="block font-sans text-sm font-medium capitalize leading-none antialiased text-black">
                                    {category.name}
                                </p>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    )
}

export default CategoryChips