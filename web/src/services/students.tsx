import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { sortQuery } from "../lib/helper";

export const students = createApi({
    reducerPath: 'students',
    tagTypes: ['students'],
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
        getStudents: builder.query({
            query: (query) => ({
                url: `student?${sortQuery(query)}`,
                method: 'GET',
            }),
            providesTags: ['students'],
        }),
        getStudent: builder.query({
            query: (id) => `student/${id}`,
            providesTags: ['students'],
        }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: `student`,
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['students'],
        }),
        updateStudent: builder.mutation({
            query: (data) => ({
                url: `student/${data?.id}`,
                method: 'PUT',
                body: { ...data },
            }),
            invalidatesTags: ['students'],
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['students'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetStudentsQuery,
    useGetStudentQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    util: { getRunningQueriesThunk },
} = students;

// export endpoints for use in SSR
export const { getStudents, getStudent } = students.endpoints;