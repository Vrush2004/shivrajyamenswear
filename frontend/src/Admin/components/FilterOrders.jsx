import React, { useState, useRef } from 'react'
import { Input } from "@material-tailwind/react";
import { searchContent, fromDate, toDate } from '../Features/orders/filterOrderSlice';
import { useDispatch } from 'react-redux';

const FilterOrders = () => {

    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(searchContent(e.target.value));
    }

    const fromDateChange = (e) => {
        dispatch(fromDate(e.target.value));
    }
    const toDateChange = (e) => {
        dispatch(toDate(e.target.value));
    }
    const fromDatePicker = useRef("");
    const toDatePicker = useRef("");

    const resetDateFilter = () => {
        dispatch(fromDate(null));
        dispatch(toDate(new Date().toISOString().split('T')[0]));
        fromDatePicker.current.value = "";
        toDatePicker.current.value = new Date().toISOString().split('T')[0];
    }

    return (
        <div className='block md:flex justify-between my-6 mx-6'>

            {/* ------------- date picker ------------- */}

            <div className="flex items-center">
                <span className="mx-4 text-gray-500">From</span>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input name="start" type="date" ref={fromDatePicker} onChange={fromDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input name="end" type="date" ref={toDatePicker} onChange={toDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <button onClick={resetDateFilter} className='bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ml-4 flex text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Reset
                </button>
            </div>

            {/* ------------- search ------------- */}
            <div className="w-full md:w-72 mt-6 md:mt-0">
                <Input label="Search by Product, Name, Mobile, Addr "
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    }
                    onChange={handleSearch} />
            </div>
        </div>
    )
}

export default FilterOrders