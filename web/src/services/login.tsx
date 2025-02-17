import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import Cookies from 'js-cookie';

export const login = createApi({
    reducerPath: 'login',
    tagTypes: ['login'],
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
        postLogin: builder.mutation({
            query: (data) => ({
                url: `/user/login`,
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['login'],
        }),
        postLogout: builder.mutation({
            query: () => ({
                url: `/user/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['login'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePostLoginMutation,
    usePostLogoutMutation,
    util: { getRunningQueriesThunk },
} = login;

// export endpoints for use in SSR
export const { postLogin } = login.endpoints;