import React from 'react'
import Product_Navbar from '../components/General/Product_Navbar'
import Navbar from '../components/General/Navbar'
import Footer from '../components/General/Footer'

const TermsPage = ({ currentWidth }) => {
    return (
        <>
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <div className="privacy-page p-4 pt-4 md:p-8 md:m-4">
                
                <h1 className="text-3xl font-semibold mb-4">Terms & Conditions</h1>

                <p className="mb-4">
                    <strong>Effective Date:</strong> [15 Aug 2023]
                </p>

                <p className="mb-4">
                    Welcome to Shivrajya Men's Wear. By accessing our website and purchasing our products, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
                </p>

                <h2 className="text-xl font-semibold mb-4">Use of Our Website</h2>

                <p>
                    Our website and its content are intended for general information and use. Your use of our website is at your own risk and you are responsible for ensuring that your use of our website complies with applicable laws.
                </p>

                <h2 className="text-xl font-semibold mb-4 mt-8">Product Information</h2>

                <p>
                    We strive to provide accurate and up-to-date information regarding our products. However, we do not guarantee the accuracy, completeness, or reliability of any product information on our website.
                </p>

                <h2 className="text-xl font-semibold mb-4 mt-8">Payment and Transactions</h2>

                <p>
                    Payments for products purchased on our website must be made through the provided payment methods. We reserve the right to refuse or cancel any orders placed for products listed at an incorrect price.
                </p>

                {/* <!-- Add more sections as needed --> */}

                <h2 className="text-xl font-semibold mb-4 mt-8">Limitation of Liability</h2>

                <p>
                    To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use or inability to use our website or products.
                </p>

                <p className="mt-8">
                    These terms and conditions are subject to change. We will post any changes on this page.
                </p>

                <p className="mt-8 mb-16 md:mb-6">
                    If you have any questions or concerns about these terms and conditions, please contact us at the contact information provided.
                </p>

            </div>
            <Footer/>
        </>
    )
}

export default TermsPage