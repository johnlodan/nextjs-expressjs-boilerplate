import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { sortQuery } from "../lib/helper";

export const teachers = createApi({
    reducerPath: 'teachers',
    tagTypes: ['teachers'],
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
        getTeachers: builder.query({
            query: (query) => `teachers?${sortQuery(query)}`,
            providesTags: ['teachers'],
        }),
        getTeacher: builder.query({
            query: (id) => `teacher/${id}`,
            providesTags: ['teachers'],
        }),
        createTeacher: builder.mutation({
            query: (data) => ({
                url: `teacher`,
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['teachers'],
        }),
        updateTeacher: builder.mutation({
            query: (data) => ({
                url: `teacher/${data?.id}`,
                method: 'PUT',
                body: { ...data },
            }),
            invalidatesTags: ['teachers'],
        }),
        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `teacher/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['teachers'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetTeachersQuery,
    useGetTeacherQuery,
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    util: { getRunningQueriesThunk },
} = teachers;

// export endpoints for use in SSR
export const { getTeachers, getTeacher } = teachers.endpoints;