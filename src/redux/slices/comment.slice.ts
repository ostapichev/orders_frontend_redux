import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {commentService} from "../../services";
import {IComment, IErrorComment} from "../../interfaces";


interface IState {
    comments?: IComment[];
    triggerComment: boolean;
    loading: boolean;
    errors: IErrorComment;
}

const initialState: IState = {
    comments: null,
    triggerComment: false,
    loading: false,
    errors: null
};

const create = createAsyncThunk<void, {order_id: number, comment: IComment}> (
    'commentSlice/create',
    async ({order_id, comment}, {rejectWithValue}) => {
        try {
            await commentService.create(order_id.toString(), comment);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getAll = createAsyncThunk<IComment[], {order_id: number}> (
    'commentSlice/getAll',
    async ({order_id}, {rejectWithValue}) => {
        try {
            await commentService.getAll(order_id.toString());
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(create.fulfilled, state => {
                state.triggerComment = !state.triggerComment;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.errors = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.errors = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload;
                state.loading = false;
            })
    }
});

const {actions, reducer: commentReducer} = slice;
const commentActions = {
    ...actions,
    create,
    getAll
};

export {
    commentActions,
    commentReducer
};
