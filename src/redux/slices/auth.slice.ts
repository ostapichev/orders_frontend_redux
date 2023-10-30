import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IAuth, IErrorAuth, IUser} from "../../interfaces";
import {authService, userService} from "../../services";


interface IState {
    me: IUser;
    error: IErrorAuth;
}

const initialState: IState = {
    me: null,
    error: null
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
            await userService.activateUser(formData);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateRequestUser = createAsyncThunk<void, {formData: FormData, token: string}> (
    'authSlice/activate',
    ({formData ,token}, {rejectWithValue}) => {
        try {
            return authService.activateRequestUser(formData, token);
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
    me
};

export {
    authReducer,
    authActions
};
