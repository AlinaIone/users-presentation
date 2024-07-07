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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;