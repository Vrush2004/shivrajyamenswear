import { baseUrl } from "../../../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trackOrderApi = createApi({
    reducerPath: 'trackOrderApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

        trackMyOrder: builder.mutation({
            query: (orderIDorMobile) => ({
                url: '/trackorder',
                method: 'POST',
                body: orderIDorMobile
            })
        })

    })
})

export const { useTrackMyOrderMutation} = trackOrderApi
