import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetOrder } from "../Features/orders/orderSlice";

function OrderSuccessPage() {
    const params = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        // reset currentOrder
        dispatch(resetOrder())
    }, [dispatch])

    return (
        <>
            {!params.id && <Navigate to='/products' replace={true}></Navigate>}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-orange-600">Order Successfully Placed</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Order Number #{params?.id}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        You can check your order in My Account  My Orders
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default OrderSuccessPage;