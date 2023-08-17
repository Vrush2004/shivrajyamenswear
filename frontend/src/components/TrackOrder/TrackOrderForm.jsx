import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsBody,
    TabPanel,
} from "@material-tailwind/react";
import { Slide, AttentionSeeker, Fade } from "react-awesome-reveal";
import DeliveryTimeline from "./DeliveryTimeline";
import { useTrackMyOrderMutation } from "../../Features/trackOrder/trackOrderApi";
import { useDispatch } from "react-redux";
import { trackedOrderData, trackedOrderError } from "../../Features/trackOrder/trackOrderSlice";


export default function TrackOrderForm() {

    const [trackingId, setTrackingId] = useState("");
    const dispatch = useDispatch();
    const [trackParsel] = useTrackMyOrderMutation();

    const handleTrackingIdChange = (event) => {
        setTrackingId(event.target.value);
    };
    const handleTrackOrder = async (e) => {
        // Handle the track order functionality here
        e.preventDefault();
        dispatch(trackedOrderError(null));
        dispatch(trackedOrderData(null));

        if (trackingId.length >= 10) {
            try {

                let response = await trackParsel({ orderIDorMobile: trackingId })

                if (response.error) {
                    dispatch(trackedOrderError(response.error.data));
                }
                if (response.data) {
                    dispatch(trackedOrderData(response.data))
                }

            } catch (error) {
                console.error("Error tracking order:", error);
            }
        } else {
            dispatch(trackedOrderError({ error: "Enter valid orderID or Mobile Number" }));
        }
    };

    return (
        <div className="track-order my-10 grid place-items-center mx-4 md:mx-0">
            <Card className="w-full max-w-[24rem]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: "linear-gradient(to right, #ffb75e, #ed8f03)",
                    }}
                >
                    <Slide direction="left" delay={2000}>
                        <div className="mb-3 rounded-full border border-white/10 bg-white/10 p-4 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                />
                            </svg>
                        </div>
                    </Slide>
                    <Typography variant="h5" color="white">
                        Track Your Order
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Tabs value={"card"}>
                        <TabsBody>
                            <TabPanel value="card">
                                <form className="flex flex-col gap-4">
                                    <div className="mb-6">
                                        <Input
                                            label="Enter Order Id or Mobile Number"
                                            maxLength={19}
                                            value={trackingId}
                                            onChange={handleTrackingIdChange}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-orange-gray-300">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                                </svg>
                                            }
                                        />
                                    </div>
                                    <Button
                                        size="lg"
                                        style={{
                                            backgroundImage:
                                                "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )",
                                        }}
                                        type="submit"
                                        onClick={handleTrackOrder}
                                    >
                                        <AttentionSeeker effect="shake">
                                            Track My Order
                                        </AttentionSeeker>
                                    </Button>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="-mt-0.5 h-4 w-4 capitalize">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>

                                        {" "}
                                        Your Package is safe with our delivery Partner
                                    </Typography>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>


            {/* ------------------- delivery status --------------------- */}
            <DeliveryTimeline />
        </div>
    );
}
