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
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Slide, AttentionSeeker,Fade } from "react-awesome-reveal";
import DeliveryTimeline from "./DeliveryTimeline";


export default function TrackOrderForm() {
    const [trackingId, setTrackingId] = useState("");

    const handleTrackingIdChange = (event) => {
        setTrackingId(event.target.value);
    };

    const handleTrackOrder = () => {
        // Handle the track order functionality here
        console.log("Tracking ID:", trackingId);
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
                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                />
                            </svg>
                        </div>
                    </Slide>
                    <Typography variant="h4" color="white">
                        Track Your Order
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Tabs value={"card"}>
                        <TabsBody>
                            <TabPanel value="card">
                                <form className="mt-2 flex flex-col gap-4">
                                    <div className="mb-6">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium"
                                        >
                                            Tracking Id
                                        </Typography>
                                        <Input
                                            label="Enter Tracking Id"
                                            maxLength={19}
                                            value={trackingId}
                                            onChange={handleTrackingIdChange}
                                            icon={
                                                <CreditCardIcon className="h-5 w-5 text-orange-gray-300" />
                                            }
                                        />
                                    </div>
                                        <Button
                                            size="lg"
                                            style={{
                                                backgroundImage:
                                                    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )",
                                                }}
                                            onClick={handleTrackOrder}
                                        >
                                                {/* <AttentionSeeker effect="shake"> */}
                                            Track My Order
                                    {/* </AttentionSeeker> */}
                                        </Button>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                    >
                                        <LockClosedIcon className="-mt-0.5 h-4 w-4 capitalize" />{" "}
                                        Your Package is safe with our delivery Partner
                                    </Typography>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>


            {/* ------------------- delivery status --------------------- */}
            <DeliveryTimeline/>
        </div>
    );
}
