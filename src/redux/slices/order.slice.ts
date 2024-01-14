import { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { IErrorOrder, IOrder, IPagination, IParams } from "../../interfaces";
import { orderService } from "../../services";


interface IState {
    orders: IOrder[];
    me?: string;
    checkbox: boolean;
    errorsOrder: IErrorOrder;
    orderUpdate: IOrder;
    orderCreate: string;
    trigger: boolean;
    loading: boolean;
    sorted: boolean;
    orderBy: string;
    totalPagesOrders: number;
    pageOrders: number;
    fileDataURL?: string;
    openOrderForm: boolean;
    openModal: boolean;
    nameInputData: string;
    surNameInputData: string;
    emailInputData: string;
    phoneInputData: string;
    ageInputData: string;
    courseInputData: string;
    formatCourseInputData: string;
    typeCourseInputData: string;
    statusInputData: string;
    groupInputData: string;
    startDateInputData: string;
    endDateInputData: string;
    showParams: boolean;
    dataInfo: IPagination<void>;
}

const initialState: IState = {
    orders: [],
    me: null,
    checkbox: false,
    errorsOrder: null,
    orderUpdate: null,
    orderCreate: null,
    trigger: false,
    loading: false,
    sorted: true,
    orderBy: '',
    totalPagesOrders: 0,
    pageOrders: 1,
    fileDataURL: null,
    openOrderForm: false,
    openModal: false,
    nameInputData: '',
    surNameInputData: '',
    emailInputData: '',
    phoneInputData: '',
    ageInputData: '',
    courseInputData: '',
    formatCourseInputData: '',
    typeCourseInputData: '',
    statusInputData: '',
    groupInputData: '',
    startDateInputData: '',
    endDateInputData: '',
    showParams: false,
    dataInfo: {},
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, { params: IParams }> (
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

const create = createAsyncThunk<void, { groupId: string, order: IOrder }> (
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

const update = createAsyncThunk<void, { id: number, order: IOrder }> (
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

const getExelFile = createAsyncThunk<string,{ params: IParams }> (
    'orderSlice/getExelFile',
    async ({ params }, { rejectWithValue }) => {
        try {
            const response: AxiosResponse = await orderService.createExelFile(params);
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            return URL.createObjectURL(blob);
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
        },
        setOrderCreate: (state, action) => {
            state.orderCreate = action.payload;
        },
        setOrderByParams: (state, action) => {
            state.orderBy = action.payload;
            state.sorted = !state.sorted;
            state.pageOrders = 1;
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
            state.pageOrders = 1;
        },
        setNameInputData: (state, action) => {
            state.nameInputData = action.payload;
            state.pageOrders = 1;
        },
        setSurNameInputData: (state, action) => {
            state.surNameInputData = action.payload;
            state.pageOrders = 1;
        },
        setEmailInputData: (state, action) => {
            state.emailInputData = action.payload;
            state.pageOrders = 1;
        },
        setPhoneInputData: (state, action) => {
            state.phoneInputData = action.payload;
            state.pageOrders = 1;
        },
        setAgeInputData: (state, action) => {
            state.ageInputData = action.payload;
            state.pageOrders = 1;
        },
        setCourseInputData: (state, action) => {
            state.courseInputData = action.payload;
            state.pageOrders = 1;
        },
        setFormatInputData: (state, action) => {
            state.formatCourseInputData = action.payload;
            state.pageOrders = 1;
        },
        setTypeInputData: (state, action) => {
            state.typeCourseInputData = action.payload;
            state.pageOrders = 1;
        },
        setStatusInputData: (state, action) => {
            state.statusInputData = action.payload;
            state.pageOrders = 1;
        },
        setGroupInputData: (state, action) => {
            state.groupInputData = action.payload;
            state.pageOrders = 1;
        },
        setStartDateInputData: (state, action) => {
            state.startDateInputData = action.payload;
            state.pageOrders = 1;
        },
        setEndDateInputData: (state, action) => {
            state.endDateInputData = action.payload;
            state.pageOrders = 1;
        },
        resetParams: state => {
            state.sorted = true;
            state.orderBy = '';
            state.pageOrders = 1;
            state.nameInputData = '';
            state.surNameInputData = '';
            state.emailInputData = '';
            state.phoneInputData = '';
            state.ageInputData = '';
            state.courseInputData = '';
            state.formatCourseInputData = '';
            state.typeCourseInputData = '';
            state.statusInputData = '';
            state.groupInputData = '';
            state.startDateInputData = '';
            state.endDateInputData = '';
            state.checkbox = false;
            state.showParams = false;
        },
        setPage: (state, action) => {
            state.pageOrders = action.payload;
            state.showParams = true;
        },
        openForm: state => {
            state.openOrderForm = true;
            state.errorsOrder = null;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
            state.errorsOrder = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const { result, total_pages } = action.payload;
                state.orders = result;
                state.totalPagesOrders = total_pages;
                state.errorsOrder = null;
            })
            .addCase(update.fulfilled, state => {
                state.orderUpdate = null;
                state.openOrderForm = false;
                state.errorsOrder = null;
            })
            .addCase(getExelFile.fulfilled, (state, action) => {
                state.fileDataURL = action.payload;
                state.loading = false;
                state.errorsOrder = null;
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

const { actions, reducer: orderReducer } = slice;
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
