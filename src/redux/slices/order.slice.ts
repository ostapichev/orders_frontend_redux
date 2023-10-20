import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorOrder, IOrder} from "../../interfaces";
import {orderService} from "../../services";


interface IState {
    orders: IOrder[];
    errors: IErrorOrder;
    nextPage?: number;
    prevPage?: number;
    userUpdate: boolean;
    trigger: boolean;
    loading: boolean;
    totalPages: number;
}

const initialState: IState = {
    orders: [],
    errors: null,
    nextPage: null,
    prevPage: null,
    userUpdate: null,
    trigger: false,
    loading: false,
    totalPages: 1
};

const getAll = createAsyncThunk<IOrder[], {page: string}>(
    'orderSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return data.result;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getTotalPages = createAsyncThunk<number, void>(
    'orderSlice/getTotalPages',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getTotalPages();
            return data.total_pages;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getTotalPages.fulfilled, (state, action) => {
                state.totalPages = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errors = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.errors = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload;
                state.loading = false;
            })
});

const {actions, reducer: orderReducer} = slice;
const orderActions = {
    ...actions,
    getAll,
    getTotalPages
};

export {
    orderActions,
    orderReducer
};
