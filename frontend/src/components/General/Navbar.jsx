import React from 'react';
import Logo from '../../assets/logo.png'
import Maharaj from '../../assets/maharaj2.png'
import Rajmudra from '../../assets/rajmudra.png';
import Search from './Search';
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Home', link: '/', current: true },
    { name: 'Shirts', link: '/category/shirt', current: false },
    { name: 'Jeans', link: '/category/jeans', current: false },
    { name: 'T-shirt', link: '/category/tshirt', current: false },
    { name: 'More', link: '/products', current: false },
]


const Navbar = () => {

    return (
        <nav className="flex items-center justify-between  py-2 lg:py-3  bg-black text-white sticky top-0 z-10">
            {/* Left Logo */}
            <div>
                <img src={Maharaj} alt="Left Logo" className="h-16 lg:h-20 ml-2 lg:ml-8" />
            </div>

            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-10 font-oswald text-lg">
                {
                    navigation.map((navlink, index) =>
                        <li key={index}>
                            <NavLink to={navlink.link} value={navlink.link} className="text-white hover:text-gray-400">{navlink.name}</NavLink>
                        </li>
                    )
                }

            </ul>

            {/* Center Logo */}
            <div>
                <img src={Logo} alt="Center Logo" className="w-28 lg:w-40" />
            </div>

            {/* Navigational Links (Hidden in Mobile) */}
            <ul className="hidden md:flex md:gap-10 text-lg">

                {/* <li>
                    <NavLink to="/about" className="text-white hover:text-gray-400">Accessories</NavLink>>
                </li> */}
                <li className='mt-5'>
                    <NavLink to="/cart" value="/cart" className="text-white hover:text-gray-400 flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <div className='badge'>0</div>
                        <span className='ml-1'>Cart</span>
                    </NavLink>
                </li>
                <li className='mt-5'>
                    <NavLink to="/orders" value="/orders" className="text-white hover:text-gray-400 flex relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mb-1 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className='ml-1'>Orders</span>
                    </NavLink>
                </li>
                <li>
                    {/* <NavLink to="/about" className="text-white hover:text-gray-400">Contact Us</NavLink>> */}
                    <Search/>
                </li>
            </ul>

            {/* Right Logo */}
            <div>
                <img src={Rajmudra} alt="Right Logo" className="h-16 lg:h-20 mr-2 lg:mr-8" />
            </div>
        </nav>
    );
};

export default Navbar;
