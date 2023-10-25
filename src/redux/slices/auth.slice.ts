import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";

import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services";


interface IState {
    me: IUser;
}

const initialState: IState = {
    me: null
};

const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload;
            })
});

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    login
};

export {
    authReducer,
    authActions
};
