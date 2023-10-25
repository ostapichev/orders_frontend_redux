import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, groupReducer, orderReducer, userReducer} from "./slices";


const rootReducer = combineReducers({
    authReducer,
    groupReducer,
    orderReducer,
    userReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
};

export {
    setupStore
};
