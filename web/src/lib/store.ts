

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { login } from '../services/login'
import { students } from '../services/students'
import { teachers } from '../services/teachers'

const rootReducer = combineReducers({
  [login.reducerPath]: login.reducer,
  [students.reducerPath]: students.reducer,
  [teachers.reducerPath]: teachers.reducer,
})

export const makeStore = (context?: any) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            cookies: context?.req?.cookies
          },
        },
      }).concat(login.middleware)
        .concat(students.middleware)
        .concat(teachers.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
