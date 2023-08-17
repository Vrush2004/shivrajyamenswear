import React from 'react'
import { selectBuyNowProduct, selectPaymentMode } from '../../Features/checkout/checkoutSlice'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAsync,orderId } from '../../Features/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl, RAZOR_PAY_KEY_ID } from '../../../config';
import { logEvent } from "firebase/analytics";
import { analytics } from '../../Admin/firebase';

const districtsOfMaharashtra = [
    { value: 'Ahmednagar', label: 'Ahmednagar' },
    { value: 'Akola', label: 'Akola' },
    { value: 'Amravati', label: 'Amravati' },
    { value: 'SambhajiNagar (Aurangabad)', label: 'SambhajiNagar (Aurangabad)' },
    { value: 'Beed', label: 'Beed' },
    { value: 'Bhandara', label: 'Bhandara' },
    { value: 'Buldhana', label: 'Buldhana' },
    { value: 'Chandrapur', label: 'Chandrapur' },
    { value: 'Dhule', label: 'Dhule' },
    { value: 'Gadchiroli', label: 'Gadchiroli' },
    { value: 'Gondia', label: 'Gondia' },
    { value: 'Hingoli', label: 'Hingoli' },
    { value: 'Jalgaon', label: 'Jalgaon' },
    { value: 'Jalna', label: 'Jalna' },
    { value: 'Kolhapur', label: 'Kolhapur' },
    { value: 'Latur', label: 'Latur' },
    { value: 'Mumbai City', label: 'Mumbai City' },
    { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
    { value: 'Nagpur', label: 'Nagpur' },
    { value: 'Nanded', label: 'Nanded' },
    { value: 'Nandurbar', label: 'Nandurbar' },
    { value: 'Nashik', label: 'Nashik' },
    { value: 'Osmanabad', label: 'Osmanabad' },
    { value: 'Palghar', label: 'Palghar' },
    { value: 'Parbhani', label: 'Parbhani' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Raigad', label: 'Raigad' },
    { value: 'Ratnagiri', label: 'Ratnagiri' },
    { value: 'Sangli', label: 'Sangli' },
    { value: 'Satara', label: 'Satara' },
    { value: 'Sindhudurg', label: 'Sindhudurg' },
    { value: 'Solapur', label: 'Solapur' },
    { value: 'Thane', label: 'Thane' },
    { value: 'Wardha', label: 'Wardha' },
    { value: 'Washim', label: 'Washim' },
    { value: 'Yavatmal', label: 'Yavatmal' },
];

const PaymentDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentBuyNowProduct = useSelector(selectBuyNowProduct);
    const paymentMethod = useSelector(selectPaymentMode);

    // calculate actucalPrice + deliveryCharge
    let totalAmount = currentBuyNowProduct.actualPrice + currentBuyNowProduct.deliveryCharge;

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // razorpay payment model
    const onCloseHandler = () => {
        console.log("model closed");
    }

    // ** Place Order button **
    const onSubmit = (formAddressData) => {

        reset();

        // send this details to backend to verify payment
        const orderDetails = {
            id: currentBuyNowProduct.id,
            title: currentBuyNowProduct.title,
            quantity: currentBuyNowProduct.quantity,
            thumbnail: currentBuyNowProduct.thumbnail,
            phone: formAddressData.phone,
            email: formAddressData.email,
        }

        // call razorpay payment handler
        // also pass the address information to the function so that it can be use in dispatch(createOrderAsycn())
        handlePayment(orderDetails,formAddressData);
    }

    // initiate razorpay payment 
    const initPayment = (data, orderDetails,formAddressData) => {
        const options = {
            key: RAZOR_PAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: orderDetails.title,
            description: "Shivrajya the brands men's wear",
            image: orderDetails.thumbnail,
            order_id: data.id,
            prefill: {
                contact: orderDetails.phone,
                email: orderDetails.email,
            },
            theme: {
                color: "#ffa347",
            },
            handler: async function (response, paymentSuccess) {
                try {
                    const verifyUrl = `${baseUrl}/payment/verify`;
                    const verifyResponse = await fetch(verifyUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...response, paymentSuccess }),
                    });

                    const verifyData = await verifyResponse.json();

                    // if payment verification is successfull
                    if (verifyData.paymentSuccess) {

                        // save orderId on redux store to display to the user
                        dispatch(orderId(data.id));

                        const order = {
                            currentBuyNowProduct,
                            orderId: data.id,
                            totalAmount,
                            paymentMethod,
                            address:formAddressData,
                            status: 'pending'
                        };

                        // google analytics
                        logEvent(analytics, "place_order");

                        // create the order
                        dispatch(createOrderAsync(order));


                        // when payment is successfull navigate to order-success page
                        navigate(`/order-success`)
                    } 


                } catch (error) {
                    console.log(error);
                    // Handle errors here if necessary
                }
            }, // handler function end

        }; // options end

        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.success', function (response) {
            options.handler(response, true);  // On successful payment, call the handler function with the success flag
        });

        rzp1.on('payment.error', function (response) {
            options.handler(response, false);  // On payment error, call the handler function with the success flag
        });
        rzp1.on('razorpay_payment_failed', function () {
            // On payment failed (user closed the modal), call the handler function with the success flag set to false
            options.handler({}, false);
            onCloseHandler(); // Call the onCloseHandler to trigger the desired action when the modal is closed without successful payment
        });

        rzp1.open();
    };

    // main razorpay function 
    const handlePayment = async (orderDetails,formAddressData) => {
        try {
            const orderUrl = `${baseUrl}/payment/orders`;
            const response = await fetch(orderUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderDetails,
                }),
            });
            const data = await response.json();
            
            // call the razorpay payment initiater function & pass the orderDetails also
            initPayment(data.data, orderDetails,formAddressData);

        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be caught by the thunk
        }
    };

// ----------------------------- 
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-10 px-4 pt-8 lg:mt-0" noValidate>
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <div className="">
                    {/* contact information */}
                    <div className="contact-info mt-6 mb-2">
                        <h3 className='mb-4 font-bold'>Contact Information</h3>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.email ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="your.email@gmail.com"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">Mobile Number*</label>
                            <div className="relative">
                                <input type="tel"
                                    id="phone"
                                    name="phone"
                                    className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.phone ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="9579267386"
                                    {...register("phone", {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^[7-9]\d{9}$/,
                                            message: "Invalid Mobile Number"
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="fullName" className="mt-4 mb-2 block text-sm font-medium mb-2">Full Name*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className={`w-full rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.fullName ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Your full name here"
                                    {...register("fullName", {
                                        required: "Name is required",
                                        pattern: {
                                            value: /^.{4,}$/,
                                            message: "Full Name must have at least four characters",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>
                    </div>

                    {/* shipping information */}
                    <div className="contact-info mt-6 mb-2">
                        <h3 className='mb-4 font-bold'>Shipping Information</h3>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="address" className="block text-sm font-medium mb-2">Address Line*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.address ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Gondhawani road, ward no: 01"
                                    {...register("address", {
                                        required: "Address is required",
                                        pattern: {
                                            value: /^.{8,}$/,
                                            message: "Please Provide detailed address",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="landmark" className="block text-sm font-medium mb-2">Landmark</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="landmark"
                                    name="landmark"
                                    className={`w-full rounded-md border ${errors.landmark ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.landmark ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Enter Landmark"
                                    {...register("landmark")}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {errors.landmark && <p className="text-red-500 text-xs mt-1">{errors.landmark.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium mb-2">City*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.city ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="Shrirampur"
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <select type="text"
                                name="district"
                                className={`w-full rounded-md border ${errors.district ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.district ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                {...register('district', { required: 'District is required' })}
                            >
                                <option value="">District</option>

                                {/* map through district array */}
                                {districtsOfMaharashtra.map((district) => (
                                    <option key={district.value} value={district.value}>
                                        {district.label}
                                    </option>
                                ))}

                            </select>
                            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                        </div>
                        <div className='mb-6 md:mb-10'>
                            <label htmlFor="pincode" className="mt-4 mb-2 block text-sm font-medium mb-2">Pincode*</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    className={`w-full rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-400'} px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 ${errors.pincode ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                                    placeholder="413 709"
                                    {...register("pincode", {
                                        required: "Pincode is required",
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message: "Pincode must be 6 digit",
                                        }
                                    })}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                        </div>
                    </div>

                    {/* <!-- Total --> */}
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="font-semibold text-gray-900">₹{currentBuyNowProduct.actualPrice}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Delivery Charges</p>
                            <p className={`font-semibold ${currentBuyNowProduct.deliveryCharge == 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                {
                                    currentBuyNowProduct.deliveryCharge == 0 ? "Free" : `₹ ${currentBuyNowProduct.deliveryCharge}`
                                }
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">₹ {totalAmount}</p>
                    </div>
                </div>
                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
            </form>
        </>
    )
}

export default PaymentDetails