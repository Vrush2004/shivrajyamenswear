import React from 'react'
// desktop
import big_banner_1 from '../../assets/banner/desktop/banner2.jpg'
// mobile
import small_banner_1 from '../../assets/banner/mobile/banner1.png'

import { Carousel } from "@material-tailwind/react";


const Banner = ({ width }) => {
    return (
        <Carousel
            className="pb-0 md:pb-0 md:pt-4"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            autoplay={true}

        >
            {/* <img
                src={big_banner_1}
                srcSet="image-url-300.jpg 300w, image-url-768.jpg 768w, image-url-1280.jpg 1280w"
                sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
            /> */}
            {
                width > 640 &&
                <img
                    src={big_banner_1}
                    alt="Banner"
                /> || <img
                    src={small_banner_1}
                    alt="Banner"
                />
            }
            {/* <img
                srcSet={`
               ${small_banner_1} 300w,
                ${big_banner_1} 1200w`}
                sizes="(max-width: 300px) 300px, 1200px"
                src={small_banner_1}
                alt="Banner"
            /> */}
            {/* <img
                src={B1}
                alt="image 1"
                className="h-full w-full object-cover"
            /> */}
            {/* <img
                src={B2}
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src={B3}
                alt="image 2"
                className="h-full w-full object-cover"
            /> */}
        </Carousel>
    )
}

export default Banner