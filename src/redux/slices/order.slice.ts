import {createSlice} from "@reduxjs/toolkit";
import {IOrderState} from "../../interfaces";


const initialState: IOrderState = {
    orders: [],
    nextPage: null,
    prevPage: null
};
const slice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            const {result, next, prev} = action.payload;
            state.orders = result;
            state.prevPage = prev;
            state.nextPage = next;
        }
    }
});
const {reducer: orderReducer, actions} = slice
const orderActions = {
    ...actions
};

export {
    orderReducer,
    orderActions
};
