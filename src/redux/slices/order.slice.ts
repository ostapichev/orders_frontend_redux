import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorOrder, IOrder, IParams} from "../../interfaces";
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
    fileDataURL?: string;
    openOrderForm: boolean;
    openModal: boolean;
    params: IParams;
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
    prevPage: number;
    nextPage: number;
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
    fileDataURL: null,
    openOrderForm: false,
    openModal: false,
    params: {},
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
    prevPage: null,
    nextPage: null,
};

const getAll = createAsyncThunk<IOrder[], {params: IParams}> (
    'orderSlice/getAll',
    async ({params}, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(params);
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

const getExelFile = createAsyncThunk<string, void> (
    'orderSlice/getExelFile',
    async (_, {rejectWithValue}) => {
        try {
            const response: any = await orderService.createExelFile();
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
        setOrderBy: state => {
            state.sorted = !state.sorted;
        },
        setOrderByDefault: state => {
            state.sorted = true;
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
        },
        setCheckBoxDefault: state => {
            state.checkbox = false;
        },
        setParams: (state, action) => {
            state.params = action.payload;
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
        setShowModal: (state, action) => {
            state.openModal = action.payload;
        },
        setPaginate: (state, action) => {
            const {result, prev, next} = action.payload;
            state.orders = result;
            state.prevPage = prev;
            state.nextPage = next;
        },
        openForm: state => {
            state.openOrderForm = true;
            state.loading = false;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload;
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
