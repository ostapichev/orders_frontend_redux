import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import { IErrorGroup, IGroup } from "../../interfaces";
import { groupService } from "../../services";


interface IState {
    groups: IGroup[];
    errors: IErrorGroup;
    trigger: boolean;
    loading: boolean;
    vision: boolean;
}

const initialState: IState = {
    groups: [],
    errors: null,
    trigger: false,
    loading: false,
    vision: false,
};

const getAll = createAsyncThunk<IGroup[], void> (
    'groupSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await groupService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, { group: IGroup }> (
    'groupSlice/create',
    async ({ group }, { rejectWithValue }) => {
        try {
            await groupService.create(group);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        setVision: state => {
            state.vision = !state.vision;
        },
        setVisionDefault: state => {
            state.vision = false;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.errors = null;
                state.loading = false;
            })
            .addCase(create.fulfilled, state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload;
            })
});

const { actions, reducer: groupReducer } = slice;
const groupActions = {
    ...actions,
    getAll,
    create
};

export {
    groupActions,
    groupReducer
};
