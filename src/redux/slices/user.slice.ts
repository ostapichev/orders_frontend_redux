import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IPageParams, IUser} from "../../interfaces";
import {userService} from "../../services";


interface IState {
    users: IUser[];
    errors: IError;
    nextPage?: number;
    prevPage?: number;
    userUpdate: boolean;
    trigger: boolean;
    loading: boolean;
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
    totalPages: 1
};

const getAll = createAsyncThunk<IUser[], IPageParams>(
    'userSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll(page);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return data.result;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {user: IUser}>(
    'userSlice/create',
    async ({user}, {rejectWithValue}) => {
        try {
            await userService.create(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const ban = createAsyncThunk<void, {user: IUser, id: string}>(
    'userSlice/ban',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.ban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const unban = createAsyncThunk<void, {user: IUser, id: string}>(
    'userSlice/ban',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.unban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const getTotalPages = createAsyncThunk<number, void>(
    'userSlice/getTotalPages',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getTotalPages();
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
    getTotalPages
};

export {
    userActions,
    userReducer
};
