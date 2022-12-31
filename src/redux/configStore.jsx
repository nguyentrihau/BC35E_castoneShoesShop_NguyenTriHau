import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartReducer";
import ProductReducer from "./reducers/ProductReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        ProductReducer:ProductReducer,
        userReducer:userReducer,
        CartReducer:CartReducer,
    }
})