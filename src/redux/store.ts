import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({

});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
};
