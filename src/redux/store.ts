import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, commentReducer, groupReducer, orderReducer, userReducer} from "./slices";


const rootReducer = combineReducers({
    authReducer,
    commentReducer,
    groupReducer,
    orderReducer,
    userReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch
};

export {
    setupStore
};
