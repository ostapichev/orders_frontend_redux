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
    name: null,
    surname: null,
    email: null,
    phone: null,
    age: null,
    course: null,
    course_format: null,
    course_type: null,
    status: null,
    group: null,
    created_at_after: null,
    created_at_before: null,
    manager: null,
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
