import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IErrorGroup, IGroup} from "../../interfaces";
import {groupService} from "../../services";


interface IState {
    groups: IGroup[];
    errors: IErrorGroup;
    nextPage?: number;
    prevPage?: number;
    trigger: boolean;
    loading: boolean;
    totalPages: number;
}

const initialState: IState = {
    groups: [],
    errors: null,
    nextPage: null,
    prevPage: null,
    trigger: false,
    loading: false,
    totalPages: 1
};

const getAll = createAsyncThunk<IGroup[], {page: string}>(
    'groupSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await groupService.getAll(page);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return data.result;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {group: IGroup}>(
    'groupSlice/create',
    async ({group}, {rejectWithValue}) => {
        try {
            await groupService.create(group);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getTotalPages = createAsyncThunk<number, void>(
    'groupSlice/getTotalPages',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await groupService.getTotalPages();
            return data.total_pages;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.groups = action.payload;
            })
            .addCase(getTotalPages.fulfilled, (state, action) => {
                state.totalPages = action.payload;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errors = null;
            })
            .addMatcher(isFulfilled(create), state => {
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

const {actions, reducer: groupReducer} = slice;
const groupActions = {
    ...actions,
    getAll,
    create,
    getTotalPages
};

export {
    groupActions,
    groupReducer
};
