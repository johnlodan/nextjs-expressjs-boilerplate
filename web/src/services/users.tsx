"use server"
import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const users = createApi({
    reducerPath: 'users',
    tagTypes: ['users'],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_API,
        prepareHeaders: (headers, { extra }: { extra: any }) => {
            const ssrToken = extra?.cookies?.[process.env.TOKEN_NAME!]
            const csrToken = Cookies.get(process.env.TOKEN_NAME!)
            /**
             * ssrToken use in server side rendering like 'getServerSideProps'
             * csrToken use in functional component and React Hooks, RTK Query Hooks like 'use[]Query'
             */
            headers.set(
                "Authorization",
                ssrToken || csrToken
            );
            return headers
        },
    }),
    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: `dashboard/current-user`,
                method: 'GET',
            }),
            providesTags: ['users'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetCurrentUserQuery,
    util: { getRunningQueriesThunk },
} = users;

// export endpoints for use in SSR
export const { getCurrentUser } = users.endpoints;