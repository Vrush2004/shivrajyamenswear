import React from 'react'
import Header from '../components/Checkout/Header'
import PaymentDetails from '../components/Checkout/PaymentDetails'
import OrderSummary from '../components/Checkout/OrderSummary'

const CheckoutPage = () => {
    return (
        <div>
            {/* ----- include header ------- */}
            <Header/>
            
            <div class="grid sm:px-5 lg:grid-cols-2 lg:px-10 xl:px-16">

                 {/* ----- include order summary ------- */}
                 <OrderSummary/>
                 
                 {/* ----- include payment details ------- */}
                 <PaymentDetails/>
            </div>

        </div>
    )
}

export default CheckoutPage