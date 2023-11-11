import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorUser, IUser} from "../../interfaces";
import {adminService} from "../../services";
import {IOrderStatistic, IUserStatistic} from "../../interfaces/statistic.interface";


interface IState {
    users: IUser[];
    errorUser: IErrorUser;
    userUpdate: boolean;
    trigger: boolean;
    statisticTrigger: boolean;
    loading: boolean;
    orderStatistic: IOrderStatistic;
    userStatistic: IUserStatistic;
    totalPages: number;
    openUserForm: boolean;
}

const initialState: IState = {
    users: [],
    errorUser: null,
    userUpdate: null,
    trigger: false,
    statisticTrigger: false,
    loading: false,
    orderStatistic: {},
    userStatistic: {},
    totalPages: 1,
    openUserForm: false
};

const getAll = createAsyncThunk<IUser[], {page: string}> (
    'userSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await adminService.getAll(page);
            await new Promise(resolve => setTimeout(resolve, 1000));
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

const ban = createAsyncThunk<void, {id: string}> (
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

const unban = createAsyncThunk<void, {id: string}> (
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
            console.log(id);
            const {data} = await adminService.getStatisticUser(id.toString())
            console.log(data);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        openUserForm: state => {
            state.openUserForm = true;
        },
        closeUserForm: state => {
            state.openUserForm = false;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getStatisticOrder.fulfilled, (state, action) => {
                state.orderStatistic = action.payload;
                state.loading = false;
            })
            .addCase(getStatisticUser.fulfilled, (state, action) => {
                state.userStatistic = action.payload;
                state.loading = false;
                state.statisticTrigger = !state.statisticTrigger;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errorUser = null;
            })
            .addMatcher(isFulfilled(ban, unban), state => {
                state.userUpdate = null;
            })
            .addMatcher(isFulfilled(create, ban, unban), state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.errorUser = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errorUser = action.payload;
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
    getStatisticOrder,
    getStatisticUser
};

export {
    userActions,
    userReducer
};
