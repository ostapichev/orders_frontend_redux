import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IAuth, IErrorAuth, IUser} from "../../interfaces";
import {authService} from "../../services";


interface IState {
    me: IUser;
    error: IErrorAuth;
    confirmError?: string;
}

const initialState: IState = {
    me: null,
    error: null,
    confirmError: null
};

const login = createAsyncThunk<IUser, IAuth> (
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateUser = createAsyncThunk<void, {formData: FormData}>(
    'userSlice/activateUser',
    async ({formData}, {rejectWithValue}) => {
        try {
            await authService.activateUser(formData);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateRequestUser = createAsyncThunk<void, {formData: FormData, token: string}> (
    'authSlice/activateRequestUser',
    ({formData ,token}, {rejectWithValue}) => {
        try {
            return authService.activateRequestUser(formData, token);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const recoveryPassword = createAsyncThunk<void, {formData: FormData}>(
    'userSlice/recoveryPassword',
    async ({formData}, {rejectWithValue}) => {
        try {
            await authService.recoveryPassword(formData);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const recoveryRequestPassword = createAsyncThunk<void, {formData: FormData, token: string}> (
    'authSlice/recoveryRequestPassword',
    ({formData ,token}, {rejectWithValue}) => {
        try {
            return authService.recoveryPasswordRequest(formData, token);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const me = createAsyncThunk<IUser, void> (
    'authSlice/me',
    async () => {
        const {data} = await authService.me();
        return data;
    }
);

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: state => {
            state.me = null;
            state.error = null;
            authService.deleteTokens();
        },
        setConfirmError: (state, action) => {
            state.confirmError = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(login, me), (state, action) => {
                state.me = action.payload;
            })
            .addMatcher(isRejectedWithValue(), (state, actions) => {
                state.error = actions.payload as IErrorAuth;
            })
});

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    login,
    activateUser,
    activateRequestUser,
    recoveryPassword,
    recoveryRequestPassword,
    me
};

export {
    authReducer,
    authActions
};