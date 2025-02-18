

import { configureStore, Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { login } from '../services/login'
import { students } from '../services/students'
import { teachers } from '../services/teachers'
import { users } from '@/services/users'
import usersSlice from '../slices/users'

export const makeStore = (context?: any) => {
  return configureStore({
    reducer: {
      getUsersSlice: usersSlice,
      [login.reducerPath]: login.reducer,
      [users.reducerPath]: users.reducer,
      [students.reducerPath]: students.reducer,
      [teachers.reducerPath]: teachers.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            cookies: context?.req?.cookies
          },
        },
      }).concat([
        login.middleware,
        users.middleware,
        students.middleware,
        teachers.middleware,
        rtkQueryErrorLogger
      ])
  })
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // isRejectedWithValue Or isRejected
    if (isRejected(action)) {
      if (typeof window !== "undefined") {
        window.location.href = `/redirect?message=${btoa(action.payload?.data?.message)}&status=${btoa(action.payload?.status)}`
      }
    }
    return next(action);
  };


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
