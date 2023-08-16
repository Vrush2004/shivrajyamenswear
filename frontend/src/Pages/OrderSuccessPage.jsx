import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrderId } from "../Features/orders/orderSlice";

function OrderSuccessPage() {
    const orderId = useSelector(selectOrderId);

    return (
        <>
            {!orderId && <Navigate to='/products' replace={true}></Navigate>}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-orange-600">Order Successfully Placed</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Order ID: <p className="font-normal">{orderId}</p>
                    </h1>
                    <p className="mt-6 text-base leading-7 text-red-600">
                        note this orderID <span className="text-black mx-1"> OR</span> take a screenshot of this page
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/track-order"
                            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Track Order
                        </Link>
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Link
                            to="/products"
                            className="text-blue-400 flex"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            continue shopping
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default OrderSuccessPage;