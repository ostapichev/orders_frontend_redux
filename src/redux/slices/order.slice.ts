import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorOrder, IOrder} from "../../interfaces";
import {orderService} from "../../services";


interface IState {
    orders: IOrder[];
    me?: string;
    checkbox: boolean;
    errors: IErrorOrder;
    nextPage?: number;
    prevPage?: number;
    orderUpdate: IOrder;
    orderCreate: string;
    trigger: boolean;
    loading: boolean;
    sorted: boolean;
    totalPages: number;
}

const initialState: IState = {
    orders: [],
    me: null,
    checkbox: false,
    errors: null,
    nextPage: null,
    prevPage: null,
    orderUpdate: null,
    orderCreate: null,
    trigger: false,
    loading: false,
    sorted: true,
    totalPages: 1
};

const getAll = createAsyncThunk<IOrder[], {page: string, order_by: string, manager: string}> (
    'orderSlice/getAll',
    async ({page, order_by, manager}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(page, order_by, manager);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return data.result;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {groupId: string, order: IOrder}> (
    'orderSlice/create',
    async ({groupId, order}, {rejectWithValue}) => {
        try {
            await orderService.create(groupId, order);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const update = createAsyncThunk<void, {order: IOrder, id: number}> (
    'orderSlice/update',
    async ({id, order}, {rejectWithValue}) => {
        try {
            await orderService.updateById(id.toString(), order)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getTotalPages = createAsyncThunk<number, void> (
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
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload;
        },
        setOrderCreate: (state, action) => {
            state.orderCreate = action.payload;
        },
        setOrderBy: state => {
            state.sorted = !state.sorted;
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.orderUpdate = null;
            })
            .addCase(getTotalPages.fulfilled, (state, action) => {
                state.totalPages = action.payload;
            })
            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger;
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
    create,
    update,
    getTotalPages
};

export {
    orderActions,
    orderReducer
};
