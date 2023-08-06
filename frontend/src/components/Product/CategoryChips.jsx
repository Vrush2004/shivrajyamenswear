import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategories, productCategory,fetchProductsByFiltersAsync,selectedProductCategory } from '../../Features/product/productSlice';


const CategoryChips = () => {
  const categories = useSelector(selectAllCategories);
  const selectedCategory = useSelector(selectedProductCategory); // Set "All" as the default selected category
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    // setSelectedCategory(category);
    // Handle any other logic when a category is clicked
    if(category == "All"){
        dispatch(productCategory("All"))
        dispatch(fetchProductsByFiltersAsync({}))
    }else{
        dispatch(productCategory(category));
        dispatch(fetchProductsByFiltersAsync({"category":category}))
    }
  };

  return (
    <div className='category-wrapper px-2 py-6 md:px-16 md:pb-2 md:pt-5'>
      <Fade delay={500} direction='left' triggerOnce={true}>
        <div className="category-container flex flex-row gap-3 md:gap-12 overflow-x-scroll hide-scrollbar">
          <div
            className={`relative inline-block select-none whitespace-nowrap rounded-full px-4 py-3 align-baseline text-xs font-bold uppercase leading-none border ${selectedCategory === "All" ? 'border0 bg-orange-500 text-white' : 'border-gray-400'}`}
            onClick={() => handleCategoryClick("All")}
          >
            <div className="absolute top-2/4 left-0 h-8 w-8 -translate-y-2/4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-3 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div className="ml-6 mt-px">
              <p className="block font-sans text-sm font-medium capitalize leading-none antialiased">
                All
              </p>
            </div>
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative inline-block select-none whitespace-nowrap rounded-full px-4 py-3 align-baseline text-xs font-bold uppercase leading-none border  ${selectedCategory === category.value ? 'border0 bg-orange-500 text-white' : 'border-gray-400'}`}
              onClick={() => handleCategoryClick(category.value)}
            >
              <div className="absolute top-2/4 left-0 h-8 w-8 -translate-y-2/4">
                {category.img && (
                  <img
                    alt="candice wu"
                    src={category.img}
                    className="relative inline-block h-8 w-8 translate-x-px translate-y-px rounded-full object-cover object-center"
                  />
                )}
              </div>
              <div className="ml-6 mt-px">
                <p className="block font-sans text-sm font-medium capitalize leading-none antialiased">
                  {category.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}

export default CategoryChips;
