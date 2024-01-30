import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, commentReducer, groupReducer, orderReducer, adminReducer} from "./slices";


const rootReducer = combineReducers({
    authReducer,
    adminReducer,
    commentReducer,
    groupReducer,
    orderReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

type AppStore = ReturnType<typeof setupStore>;
type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppDispatch
};

export {
    setupStore
};
