import React, { useRef } from 'react';
import bigSale from '../../assets/bigsale.png'
import Shirt from '../../assets/shirt.jpg';
import Tshirt from '../../assets/tshirt.jpg';
import jeans from '../../assets/jeans.jpg';
import sweatshirt from '../../assets/sweatshirt.jpg';
import accessories from '../../assets/accessories.jpg';
import shoes from '../../assets/shoes.jpg';
import jacket from '../../assets/jackets.jpg';
import { NavLink } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";

const categories = [
    { name: "", img: bigSale, link: '/' },
    { name: "Shirts", img: Shirt, link: '/category/shirt' },
    { name: "Jeans", img: jeans, link: '/category/jeans' },
    { name: "T-Shirts", img: Tshirt, link: '/category/tshirt' },
    { name: "SweatShirt", img: sweatshirt, link: '/category/sweatshirt' },
    { name: "Accessories", img: accessories, link: '/category/accessories' },
    { name: "Jacket", img: jacket, link: '/category/jacket' },
    { name: "Shoes", img: shoes, link: '/category/shoes' },
];

const Categories = () => {
    const categoryContainerRef = useRef(null);

    const scrollLeft = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft -= 100; // Adjust the scroll distance as needed
    };

    const scrollRight = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft += 100; // Adjust the scroll distance as needed
    };

    return (
        <div className='category-wrapper px-4 py-6 md:px-16 md:pb-2 md:pt-5'>
            <div className="category-container flex flex-row gap-6 md:gap-12 overflow-x-scroll hide-scrollbar" ref={categoryContainerRef}>
                {categories.map((category, index) => (
                    <Fade delay={500} direction='left'>
                        <NavLink to={category.link} value={category.link} className="category-box" key={index}>
                            <div className="image-box w-20 h-20 md:w-32 md:h-32 pixalated">
                                <img src={category.img} alt="shirts" className='w-full h-full' style={{ borderRadius: '50%' }} />
                            </div>
                            <div className="name text-center mt-2 font-geolatica text-sm md:text-lg">
                                {category.name}
                            </div>
                        </NavLink>
                    </Fade>
                ))}
            </div>
            <div className="scroll-buttons-container hidden md:block">
                <button className="scroll-buttons right-scroll" onClick={scrollRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="orange" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                </button>
                <button className="scroll-buttons left-scroll" onClick={scrollLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="orange" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default Categories;
