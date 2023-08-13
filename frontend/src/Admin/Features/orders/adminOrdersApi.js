import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../../config";

export const adminOrdersApi = createApi({
    reducerPath: 'adminOrdersApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    
    // 💥 Searching is working figure out how to do date filtering (create another api for date)💥 
    endpoints:(builder) => ({
        getOrdersWithFilter : builder.query({
          query: (params) => {
            const queryParams = {
              search: params.search,
            };
    
            if (params.fromDate !== null) {
              queryParams.fromDate = params.fromDate;
            }
    
            if (params.toDate !== null) {
              queryParams.toDate = params.toDate;
            }
    
            return {
              url: '/orders',
              params: queryParams,
            };
          },
        })
    })
})
  
  export const { useGetOrdersWithFilterQuery } = adminOrdersApi;
