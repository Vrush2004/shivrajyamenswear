import { baseUrl, RAZOR_PAY_KEY_ID } from "../../../config";

export const handlePayment = (orderDetails) => {
    return new Promise(async (resolve) => {
        try {
            const orderUrl = `${baseUrl}/payment/orders`;
            console.log("productId: ", orderDetails);
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
            console.log(data);
            resolve(data.data)
            // return data.data;
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be caught by the thunk
        }
    });
};

export const initPayment = (data, orderDetails) => {
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
            color: "#ff8000",
        },
        handler: async function (response, paymentSuccess) {
            return new Promise(async (resolve) => {
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
                    console.log(verifyData);

                    // If you want to handle the result of payment verification, you can resolve it here
                    resolve({
                        order_id: data.id,
                        paymentSuccess: verifyData.paymentSuccess, // Update the paymentSuccess flag based on verification result
                    });
                } catch (error) {
                    console.log(error);
                    // Handle errors here if necessary
                    // You might also want to reject the promise here
                    // reject(error);
                }
            });
        }, // handler fun end
    }; // options end

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.success', function (response) {
        // On successful payment, call the handler function with the success flag
        options.handler(response, true);
    });

    rzp1.on('payment.error', function (response) {
        // On payment error, call the handler function with the success flag
        options.handler(response, false);
    });

    rzp1.open();
};
