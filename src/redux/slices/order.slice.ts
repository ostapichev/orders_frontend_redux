import {AxiosError, AxiosResponse} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import FileSaver from "file-saver";

import {IErrorOrder, IOrder, IPagination, IParams} from "../../interfaces";
import {orderService} from "../../services";

interface IState {
    orders: IOrder[];
    errorsOrder: IErrorOrder;
    orderUpdate: IOrder;
    orderCreate: string;
    trigger: boolean;
    loading: boolean;
    totalPagesOrders: number;
    openOrderForm: boolean;
}

const initialState: IState = {
    orders: [],
    errorsOrder: null,
    orderUpdate: null,
    orderCreate: null,
    trigger: false,
    loading: false,
    totalPagesOrders: 0,
    openOrderForm: false,
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, {params: IParams}> (
    'orderSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const {data} = await orderService.getAll(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {groupId: string, order: IOrder}> (
    'orderSlice/create',
    async ({ groupId, order }, { rejectWithValue }) => {
        try {
            await orderService.create(groupId, order);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const update = createAsyncThunk<void, {id: number, order: IOrder}> (
    'orderSlice/update',
    async ({ id, order }, { rejectWithValue }) => {
        try {
            await orderService.updateById(id.toString(), order)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getExelFile = createAsyncThunk<void, {params: IParams}> (
    'orderSlice/getExelFile',
    async ({ params }, { rejectWithValue }) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.sheet;charset=UTF-8";
        const fileName: string = new Date().toISOString().slice(0, 10);
        try {
            const response: AxiosResponse = await orderService.createExelFile(params);
            const blob = new Blob([response.data],{type: fileType});
            return FileSaver.saveAs(blob,`${fileName}.xlsx`);
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
            state.openOrderForm = true;
            state.errorsOrder = null;
        },
        setOrderCreate: (state, action) => {
            state.orderCreate = action.payload;
        },
        openForm: state => {
            state.openOrderForm = true;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
            state.errorsOrder = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {result, total_pages} = action.payload;
                state.orders = result;
                state.totalPagesOrders = total_pages;
                state.errorsOrder = null;
            })
            .addCase(update.fulfilled, state => {
                state.orderUpdate = null;
                state.openOrderForm = false;
            })
            .addCase(getExelFile.fulfilled, state => {
                state.loading = false;
            })
            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger;
                state.errorsOrder = null;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errorsOrder = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.errorsOrder = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errorsOrder = action.payload;
                state.loading = false;
            })
});

const {actions, reducer: orderReducer} = slice;
const orderActions = {
    ...actions,
    getAll,
    create,
    update,
    getExelFile
};

export {
    orderActions,
    orderReducer
};
