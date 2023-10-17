import {createSlice} from "@reduxjs/toolkit";
import {IOrder} from "../../interfaces";


interface IState {
    orders: IOrder[];
    nextPage?: number;
    prevPage?: number;
}

const initialState: IState = {
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

const {reducer: orderReducer, actions} = slice;
const orderActions = {
    ...actions
};

export {
    orderReducer,
    orderActions
};
