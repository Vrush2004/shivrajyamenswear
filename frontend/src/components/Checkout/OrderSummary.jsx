import React from 'react'
import UPI from '../../assets/upi.jpg';
import Cash from '../../assets/rupees.png';

const OrderSummary = () => {
    return (
        <div class="px-4 pt-8" style={{background:"var(--light-grayish-blue)"}}>
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                        <span class="float-right text-gray-400">42EU - 8.5US</span>
                        <p class="text-lg font-bold">$138.99</p>
                    </div>
                </div>
                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                        <span class="float-right text-gray-400">42EU - 8.5US</span>
                        <p class="mt-auto text-lg font-bold">$238.99</p>
                    </div>
                </div>
            </div>

            <p class="mt-8 text-lg font-medium">Payment Methods</p>
            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
                    <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                        <img class="w-16 object-contain" src={UPI} alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Pay using UPI</span>
                            <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
                    <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                        <img class="w-14 object-contain" src={Cash} alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Cash on delivery</span>
                            <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default OrderSummary