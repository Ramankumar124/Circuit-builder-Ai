import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import {circuitSlice} from "./features/circuitSlice"
import { userApi } from "./api/apiSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        circuit: circuitSlice.reducer,
    [userApi.reducerPath]: userApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
