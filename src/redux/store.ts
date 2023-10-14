import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {orderReducer} from "./slices";


const rootReducer = combineReducers({
    orders: orderReducer
});
const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
};
