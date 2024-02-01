import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {authService} from "../../services";
import {IAuth, IErrorAuth, IUser} from "../../interfaces";


interface IState {
    me: IUser;
    loading: boolean;
    error: IErrorAuth;
    checkerMessage: string;
    confirmError?: string;
}

const initialState: IState = {
    me: null,
    loading: false,
    error: null,
    checkerMessage: null,
    confirmError: null,
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

const activateUser = createAsyncThunk<string, {formData: FormData}>(
    'userSlice/activateUser',
    async ({formData}, {rejectWithValue}) => {
        try {
            const {request} = await authService.activateUser(formData);
            return request.response;
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

const recoveryPassword = createAsyncThunk<string, {formData: FormData}>(
    'userSlice/recoveryPassword',
    async ({formData}, {rejectWithValue}) => {
        try {
            const {request} = await authService.recoveryPassword(formData);
            return request.response;
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
            state.loading = false;
            authService.deleteTokens();
        },
        setConfirmError: (state, action) => {
            state.confirmError = action.payload;
        },
        closeModal: state => {
            state.checkerMessage = null;
            state.error = null;
        }
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(login, me), (state, action) => {
                state.loading = false;
                state.me = action.payload;
                state.error = null;
            })
            .addMatcher(isFulfilled(activateUser, recoveryPassword), (state, action) => {
                state.loading = false;
                state.checkerMessage = action.payload;
            })
            .addMatcher(isFulfilled(activateRequestUser, recoveryRequestPassword), state => {
                state.loading = false;
                state.error = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state, actions) => {
                state.error = actions.payload as IErrorAuth;
                state.loading = false;
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
