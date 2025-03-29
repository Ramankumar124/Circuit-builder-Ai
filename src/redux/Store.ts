import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import {circuitSlice} from "./features/circuitSlice"
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        circuit: circuitSlice.reducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
