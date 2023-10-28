import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IAuth, IErrorAuth, IUser} from "../../interfaces";
import {authService} from "../../services";


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
    me
};

export {
    authReducer,
    authActions
};
