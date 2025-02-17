import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '@/services/users';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        current: {},
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(getCurrentUser.matchFulfilled, (state: any, action) => {
                state.current = action.payload;
            })
    },
});

export default usersSlice.reducer;
