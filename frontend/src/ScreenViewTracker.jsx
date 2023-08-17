import React, { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "./Admin/firebase";

function ScreenViewTracker({ screenName }) {
    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: screenName,
        });
    }, [screenName]);

    return <></>; // This component doesn't render anything, it's just for tracking
}

export default ScreenViewTracker;