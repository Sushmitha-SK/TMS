import { configureStore } from "@reduxjs/toolkit";

// Reducers
import loginReducer from "./slice/userAuthSlice";
export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

