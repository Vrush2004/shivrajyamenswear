import React, { useState } from 'react';
import t1 from '../../assets/product/t1.jpg';
import t2 from '../../assets/product/t2.jpg';
import t3 from '../../assets/product/t3.jpg';
import t4 from '../../assets/product/t4.jpg';


function ProductDetails() {
    const images = [t1, t2, t3, t4];
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <main className="item">
            <section className="img">
                <button className="img-main__btnlft img-main__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="hidden img-main__btnlft-img img-main__btn-img w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="img-main__btnrgt img-main__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor"
                        className="hidden img-main__btnrgt-img img-main__btn-img w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <img src={selectedImage} alt="" className="img-main" />
                <div className="img-btns">
                    {
                        images.map((image, index) => (
                            <button className="img-btn" key={index}>
                                <img src={image} alt="shoe product image"
                                    className="img-btn__img"
                                    onClick={() => setSelectedImage(image)}
                                />
                            </button>
                        ))
                    }
                </div>
            </section>

            <section className="price">
                <h2 className="price-sub__heading">Sneaker Company</h2>
                <h1 className="price-main__heading font-agdasima">Fall Limited Edition Sneakers</h1>
                <p className="price-txt">
                    These low-profile sneakers are your perfect casual wear companion.
                    Featuring a durable rubber outer sole, they’ll withstand everything
                    the weather can offer.
                </p>
                <div className="price-box">
                    <div className="price-box__main">
                        <span className="price-box__main-new font-agdasima ">$125.00</span>
                        <span className="price-box__main-discount"> 50%</span>
                    </div>
                    <span className="price-box__old">$250.00</span>
                </div>

                <div className="size-box flex text-black">
                    <select required>
                        <option value="default">Select size</option>
                        <option value="SM">SM</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    <div className="wishlist">
                        <span className='hidden md:block'>Add to wishlist</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                    </div>
                </div>

                <div className="price-btnbox">
                    <div className="price-btns">
                        <button className="price-btn__add price-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#ff8000"
                                className="price-btn__add-img price-btn__img w-4 h-4 md:w-6 md:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        <span className="price-btn__txt">1</span>
                        <button className="price-btn__remove price-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                                stroke="#ff8000"
                                className="price-btn__remove-img price-btn__img w-4 h-4 md:w-6 md:h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                    </div>
                    <button className="price-cart__btn btn--orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor"
                            className="price-cart__btn-img w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        But Now
                    </button>
                </div>
            </section>
        </main>
    );
}

export default ProductDetails;
