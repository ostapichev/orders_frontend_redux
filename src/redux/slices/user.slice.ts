import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorUser, IUser} from "../../interfaces";
import {adminService} from "../../services";
import {IOrderStatistic, IUserStatistic} from "../../interfaces/statistic.interface";


interface IState {
    users: IUser[];
    errors: IErrorUser;
    nextPage?: number;
    prevPage?: number;
    userUpdate: boolean;
    trigger: boolean;
    loading: boolean;
    orderStatistic: IOrderStatistic;
    userStatistic: IUserStatistic;
    totalPages: number;
}

const initialState: IState = {
    users: [],
    errors: null,
    nextPage: null,
    prevPage: null,
    userUpdate: null,
    trigger: false,
    loading: false,
    orderStatistic: {},
    userStatistic: {},
    totalPages: 1
};

const getAll = createAsyncThunk<IUser[], {page: string}> (
    'userSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await adminService.getAll(page);
            return data.result;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {user: IUser}> (
    'userSlice/create',
    async ({user}, {rejectWithValue}) => {
        try {
            await adminService.create(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const ban = createAsyncThunk<void, {user: IUser, id: string}> (
    'userSlice/ban',
    async ({id}, {rejectWithValue}) => {
        try {
            await adminService.ban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const unban = createAsyncThunk<void, {user: IUser, id: string}> (
    'userSlice/ban',
    async ({id}, {rejectWithValue}) => {
        try {
            await adminService.unban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticOrder = createAsyncThunk<IOrderStatistic, void> (
    'userSlice/getStatisticOrder',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await adminService.getStatisticOrder();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticUser = createAsyncThunk<IOrderStatistic, {id: number}> (
    'userSlice/getStatisticUser',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await adminService.getStatisticUser(id.toString());
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getTotalPages = createAsyncThunk<number, void> (
    'userSlice/getTotalPages',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await adminService.getTotalPages();
            return data.total_pages;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getTotalPages.fulfilled, (state, action) => {
                state.totalPages = action.payload;
            })
            .addCase(getStatisticOrder.fulfilled, (state, action) => {
                state.orderStatistic = action.payload;
            })
            .addCase(getStatisticUser.fulfilled, (state, action) => {
                state.userStatistic = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errors = null;
            })
            .addMatcher(isFulfilled(ban, unban), state => {
                state.userUpdate = null;
            })
            .addMatcher(isFulfilled(create, ban, unban), state => {
                state.trigger = !state.trigger;
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

const {actions, reducer: userReducer} = slice;
const userActions = {
    ...actions,
    getAll,
    create,
    ban,
    unban,
    getTotalPages,
    getStatisticOrder,
    getStatisticUser
};

export {
    userActions,
    userReducer
};
