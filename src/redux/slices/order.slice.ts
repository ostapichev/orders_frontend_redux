import {AxiosError, AxiosResponse} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorOrder, IOrder, IPagination, IParams} from "../../interfaces";
import {orderService} from "../../services";


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
    page: number;
    prevPageOrders: string;
    nextPageOrders: string;
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
    page: 1,
    prevPageOrders: null,
    nextPageOrders: null,
    fileDataURL: null,
    openOrderForm: false,
    openModal: false,
    nameInputData: null,
    surNameInputData: null,
    emailInputData: null,
    phoneInputData: null,
    ageInputData: null,
    courseInputData: null,
    formatCourseInputData: null,
    typeCourseInputData: null,
    statusInputData: null,
    groupInputData: null,
    startDateInputData: '',
    endDateInputData: '',
    showParams: false,
    dataInfo: {},
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, {params: IParams}> (
    'orderSlice/getAll',
    async ({params}, {rejectWithValue}) => {
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

const getExelFile = createAsyncThunk<string,{params: IParams}> (
    'orderSlice/getExelFile',
    async ({params}, {rejectWithValue}) => {
        try {
            const response: AxiosResponse = await orderService.createExelFile(params);
            const blob = new Blob([response.data], {type: response.headers['content-type']});
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
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
        },
        setNameInputData: (state, action) => {
            state.nameInputData = action.payload;
        },
        setSurNameInputData: (state, action) => {
            state.surNameInputData = action.payload;
        },
        setEmailInputData: (state, action) => {
            state.emailInputData = action.payload;
        },
        setPhoneInputData: (state, action) => {
            state.phoneInputData = action.payload;
        },
        setAgeInputData: (state, action) => {
            state.ageInputData = action.payload;
        },
        setCourseInputData: (state, action) => {
            state.courseInputData = action.payload;
        },
        setFormatInputData: (state, action) => {
            state.formatCourseInputData = action.payload;
        },
        setTypeInputData: (state, action) => {
            state.typeCourseInputData = action.payload;
        },
        setStatusInputData: (state, action) => {
            state.statusInputData = action.payload;
        },
        setGroupInputData: (state, action) => {
            state.groupInputData = action.payload;
        },
        setStartDateInputData: (state, action) => {
            state.startDateInputData = action.payload;
        },
        setEndDateInputData: (state, action) => {
            state.endDateInputData = action.payload;
        },
        setDefaultParams: state => {
            state.sorted = true;
            state.orderBy = '';
            state.page = 1;
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
        decPage: state => {
            state.page -= 1;
            state.showParams = true;
        },
        incPage: state => {
            state.page += 1;
            state.showParams = true;
        },
        openForm: state => {
            state.openOrderForm = true;
            state.errorsOrder = null;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {prev, next, result} = action.payload;
                state.orders = result;
                state.prevPageOrders = prev;
                state.nextPageOrders = next;
                state.errorsOrder = null;
            })
            .addCase(update.fulfilled, state => {
                state.orderUpdate = null;
                state.openOrderForm = false;
            })
            .addCase(getExelFile.fulfilled, (state, action) => {
                state.fileDataURL = action.payload;
                state.loading = false;
                state.errorsOrder = null;
            })
            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger;
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
