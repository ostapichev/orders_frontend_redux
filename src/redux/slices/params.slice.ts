import {createSlice} from "@reduxjs/toolkit";

interface IState {
    checkbox: boolean;
    pageOrders: number;
    pageUsers: number;
    order_by: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: string;
    course: string;
    course_format: string;
    course_type: string;
    status: string;
    group: string;
    created_at_after: string;
    created_at_before: string;
    manager: string;
    sorted: boolean;
    showParams: boolean;
}

const initialState: IState = {
    checkbox: false,
    pageOrders: 1,
    pageUsers: 1,
    order_by: null,
    name: '',
    surname: '',
    email: '',
    phone: '',
    age: '',
    course: '',
    course_format: '',
    course_type: '',
    status: '',
    group: '',
    created_at_after: '',
    created_at_before: '',
    manager: '',
    sorted: true,
    showParams: false
}

const slice = createSlice({
    name: 'paramsSlice',
    initialState,
    reducers: {
        setOrderBy: (state, action) => {
            state.order_by = action.payload;
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
            state.pageOrders = 1;
        },
        setNameContains: (state, action) => {
            state.name = action.payload;
        },
        setSurnameContains: (state, action) => {
            state.surname = action.payload;
        },
        setEmailContains: (state, action) => {
            state.email = action.payload;
        },
        setPhoneContains: (state, action) => {
            state.phone = action.payload;
        },
        setAgeIn: (state, action) => {
            state.age = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setCourseFormat: (state, action) => {
            state.course_format = action.payload;
        },
        setCourseType: (state, action) => {
            state.course_type = action.payload;
        },
        setStatusIn: (state, action) => {
            state.status = action.payload;
        },
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setCreatedAtAfter: (state, action) => {
            state.created_at_after = action.payload;
        },
        setCreatedAtBefore: (state, action) => {
            state.created_at_before = action.payload;
        },
        setManager: (state, action) => {
            state.manager = action.payload;
        },
        setPage: (state, action) => {
            state.pageOrders = action.payload;
            state.showParams = true;
        },
        setOrderByParams: (state, action) => {
            state.order_by = action.payload;
            state.sorted = !state.sorted;
        },
        resetParams: state => {
            state.sorted = true;
            state.order_by = '';
            state.pageOrders = 1;
            state.name = '';
            state.surname = '';
            state.email = '';
            state.phone = '';
            state.age = '';
            state.course = '';
            state.course_format = '';
            state.course_type = '';
            state.status = '';
            state.group = '';
            state.created_at_after = '';
            state.created_at_before = '';
            state.checkbox = false;
            state.showParams = false;
        },
        setNameInputData: (state, action) => {
            state.name = action.payload;
            state.pageOrders = 1;
        },
        setSurNameInputData: (state, action) => {
            state.surname = action.payload;
            state.pageOrders = 1;
        },
        setEmailInputData: (state, action) => {
            state.email = action.payload;
            state.pageOrders = 1;
        },
        setPhoneInputData: (state, action) => {
            state.phone = action.payload;
            state.pageOrders = 1;
        },
        setAgeInputData: (state, action) => {
            state.age = action.payload;
            state.pageOrders = 1;
        },
        setCourseInputData: (state, action) => {
            state.course = action.payload;
            state.pageOrders = 1;
        },
        setFormatInputData: (state, action) => {
            state.course_format = action.payload;
            state.pageOrders = 1;
        },
        setTypeInputData: (state, action) => {
            state.course_type = action.payload;
            state.pageOrders = 1;
        },
        setStatusInputData: (state, action) => {
            state.status = action.payload;
            state.pageOrders = 1;
        },
        setGroupInputData: (state, action) => {
            state.group = action.payload;
        },
        setStartDateInputData: (state, action) => {
            state.created_at_after = action.payload;
            state.pageOrders = 1;
        },
        setEndDateInputData: (state, action) => {
            state.created_at_before = action.payload;
            state.pageOrders = 1;
        },
    }
});

const {actions, reducer: paramsReducer} = slice;
const paramsActions = {
    ...actions
};

export {
    paramsActions,
    paramsReducer
};
