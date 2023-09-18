import React, { useEffect, useRef } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesAsync, selectAllCategories } from '../../Features/product/productSlice';
import { productCategory ,fetchProductsByFiltersAsync } from '../../Features/product/productSlice';

const Categories = () => {
    const categoryContainerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newCategories = useSelector(selectAllCategories)

    useEffect(()=>{
        dispatch(fetchAllCategoriesAsync());
    },[dispatch])

    const scrollLeft = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft -= 100; // Adjust the scroll distance as needed
    };

    const scrollRight = () => {
        const container = categoryContainerRef.current;
        container.scrollLeft += 100; // Adjust the scroll distance as needed
    };

    const navigateToCategory = (label)=>{
        navigate('/products');
        dispatch(productCategory(label));
        dispatch(fetchProductsByFiltersAsync({"category":label}));
    }

    return (
        <div className='category-wrapper px-4 py-6 md:px-16 md:pb-2 md:pt-5'>
            <div className="category-container flex flex-row gap-6 md:gap-12 overflow-x-scroll hide-scrollbar" ref={categoryContainerRef}>
                <Fade delay={500} direction='left'>
                    <NavLink to="/" value="/" className="category-box">
                        <div className="image-box w-20 h-20 md:w-32 md:h-32 pixalated">
                            <img src="https://firebasestorage.googleapis.com/v0/b/shivrajyamenswear.appspot.com/o/banner%2Fbigsale.png?alt=media&token=fc9f0c93-37ce-42d8-83eb-6a8e5b5d6168" alt="shirts" className='w-full h-full' style={{ borderRadius: '50%' }} />
                        </div>
                    </NavLink>
                </Fade>
                {newCategories.map((category, index) => (
                    <Fade delay={500} direction='left' key={index}>
                        <div  className="category-box"  onClick={()=>navigateToCategory(category.value)}>
                            <div className="image-box w-20 h-20 md:w-32 md:h-32 pixalated">
                                <img src={category.img} alt={category.value} className='w-full h-full' style={{ borderRadius: '50%' }} />
                            </div>
                            <div className="name text-center mt-2 font-geolatica text-sm md:text-lg">
                                {category.label}
                            </div>
                        </div>
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
