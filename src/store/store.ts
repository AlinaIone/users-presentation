import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices";

export const storeActions = {
    users: usersSlice.actions,
}
export const store = configureStore({
    reducer: {
        users: usersSlice.reducer
    },
});

// store.dispatch is a function provided by Redux to dispatch actions to the store.
// typeof store.dispatch retrieves the type of the dispatch function.
// AppDispatch - alias-> represents the type of the dispatch function Redux expects.
export type AppDispatch = typeof store.dispatch;

// store.getState retrieves the current state of the Redux store.
// ReturnType<typeof store.getState> retrieves the type of the state that the Redux store holds.
// RootState - alias -> represents the entire state of your Redux store.
export type RootState = ReturnType<typeof store.getState>;