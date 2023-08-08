import React, { useState,useEffect } from 'react'
import UPI from '../../assets/upi.jpg';
import Cash from '../../assets/rupees.png';
import { useSelector,useDispatch } from 'react-redux';
import { selectBuyNowProduct,orderPaymentMode } from '../../Features/checkout/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // select buying products
    const buyNowProduct = useSelector(selectBuyNowProduct);

    const [paymentMode, setPaymentMode] = useState('UPI');
    const handlePaymentMode = (e) => {
        setPaymentMode(e.target.value);
        dispatch(orderPaymentMode(e.target.value))
        
        console.log(e.target.value);
    }
    console.log("payment", paymentMode);

    // when refreshed the page redirect back to previous page i.e product details page
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        if (!hasMounted) {
            setHasMounted(true);
            return;
        }

        if (buyNowProduct.length === 0) {
            navigate('/products');
            console.log("hello");
        }
    }, [buyNowProduct, navigate, hasMounted]);


    return (
        <div class="px-4 pt-8" style={{ background: "var(--light-grayish-blue)" }}>
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={buyNowProduct.thumbnail} alt="" />
                    {/* <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">{buyNowProduct.title}</span>
                        <div className="flex justify-between">
                            <span class="float-right text-gray-400">Size: {buyNowProduct.selectedSize}</span>
                            <span class="float-right text-gray-400">Quantity: {buyNowProduct.quantity}</span>
                        </div>
                        <p class="text-lg font-bold">₹ {buyNowProduct.actualPrice}</p>
                    </div>
                </div>


            </div>

            <p class="mt-8 text-lg font-medium">Payment Methods</p>
            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_1" type="radio" name="radio" value="UPI" onChange={handlePaymentMode} checked={true} />
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
                    <input class="peer hidden" id="radio_2" type="radio" name="radio" value="CASH" onChange={handlePaymentMode} checked={false} />
                    <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                        <img class="w-14 object-contain" src={Cash} alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Cash on delivery</span>
                            <p class="text-red-500 text-sm leading-6">COD not available</p>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    )
}


export default OrderSummary