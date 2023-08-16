import React from 'react'
import Product_Navbar from '../components/General/Product_Navbar'
import Navbar from '../components/General/Navbar'
import Footer from "../components/General/Footer"

const PrivacyPage = ({ currentWidth }) => {
    return (
        <>
            {
                currentWidth < 640 ? <Product_Navbar /> : <Navbar />
            }
            <div className="privacy-page p-4 pt-4 md:p-8 md:m-4">
                <h1 className="text-3xl font-semibold mb-4 mt-4">Privacy Policy</h1>

                <p className="mb-4">
                    <strong>Effective Date:</strong> [15 Aug 2023]
                </p>

                <p>
                    Welcome to Shivrajya Men's Wear. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at:
                </p>

                <ul className="list-disc list-inside mt-4 mb-8">
                    <li>
                        <strong>Mobile Number:</strong> +91 8483000946
                    </li>
                    <li>
                        <strong>Email:</strong> shivrajyamenswear@gmail.com
                    </li>
                    <li>
                        <strong>Address:</strong> Near Hanuman Mandir, Gondhwani, Shrirampur, 413709, Dist: A.Nagar
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>

                <p>
                    We respect your privacy and are committed to protecting your personal information. We may collect personal information such as:
                </p>

                <ul className="list-disc list-inside mt-4 mb-8">
                    <li>Contact information: Name, email address, mailing address, and phone number.</li>
                    <li>Payment information: Credit card details and other payment information for secure transactions.</li>
                    <li>Order history: Information about your purchases and orders.</li>
                    <li>Communication information: Details of any communication between you and us.</li>
                </ul>

                {/* <!-- Add more sections as needed --> */}

                <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                <p>
                    We use the collected information for various purposes, including:
                </p>

                <ul className="list-disc list-inside mt-4 mb-8">
                    <li>
                        Processing and fulfilling orders.
                    </li>
                    <li>
                        Providing customer support and resolving issues.
                    </li>
                    <li>
                        Sending you promotional and marketing communications.
                    </li>
                    <li>
                        Improving our services, products, and website functionality.
                    </li>
                    <li>
                        Complying with legal obligations.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us using the information provided above.
                </p>

                {/* ------------------------------- */}
                <p className="mt-8">
                    By using our website or services, you consent to the practices described in this Privacy Policy.
                </p>

                <p className="mt-8 mb-16 md:mb-6">
                    This Privacy Policy is subject to change. We will post any changes on this page and update the Effective Date at the top of the page.
                </p>

            </div>

            <Footer/>
        </>
    )
}

export default PrivacyPage