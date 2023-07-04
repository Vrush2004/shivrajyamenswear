import React from 'react'
import Logo from '../../assets/logo.png'

const Footer = () => {
    return (

        <footer className="bg-black text-white dark:bg-gray-900 md:mt-12">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src={Logo} className="w-32 md:w-40 mr-3" alt="FlowBite Logo" />
                            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Categories</h2>
                            <div className="grid grid-cols-2 grid-flow-row gap-2">
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className="hover:underline">Shirts</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Jeans</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Shoes</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Sweat Shirt</a>
                                    </li>
                                </ul>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className="hover:underline">T-shirts</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Cargos</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Jacket</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="https://tailwindcss.com/" className="hover:underline">Accessories</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://www.instagram.com/shivrajya_brand_menswear/" className="hover:underline ">Instagram</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://www.instagram.com/shivrajya_brand_menswear/" className="hover:underline">Shivrajya Men's Wear</a>. All Rights Reserved.
                    </span>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between pb-32 md:pb-0">
                    <span className="flex text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        Made with
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6 mx-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        by <a href="https://www.instagram.com/_tahir_shaikh_85" className="hover:underline text-red-500 ml-1 ">Tahir Shaikh</a>
                    </span>
                </div>

            </div>
        </footer>

    )
}

export default Footer