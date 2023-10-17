import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IUser} from "../../interfaces";
import {userService} from "../../services";


interface IState {
    users: IUser[];
    errors: IError;
    nextPage?: number;
    prevPage?: number;
    userUpdate: boolean;
    trigger: boolean;
}

interface GetAllParams {
    page: string;
}

const initialState: IState = {
    users: [],
    errors: null,
    nextPage: 1,
    prevPage: 1,
    userUpdate: null,
    trigger: false
};

const getAll = createAsyncThunk<IUser[], GetAllParams>(
    'carSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll(page);
            return data.result;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
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

const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null;
            })
            .addMatcher(isFulfilled(ban, unban), state => {
                state.userUpdate = null;
            })
            .addMatcher(isFulfilled(create, ban, unban, getAll), state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload;
            })
});

const {actions, reducer: userReducer} = slice;
const userActions = {
    ...actions,
    getAll,
    create,
    ban,
    unban
};

export {
    userActions,
    userReducer
};
