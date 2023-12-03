import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {commentActions} from "../../redux";
import {commentValidator} from "../../validators";
import {IComment, IOrder} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './CommentForm.module.css';


interface IProps {
    order_id: number;
}

const CommentForm: FC<IProps> = ({order_id}) => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IComment>({
        mode: "all",
        resolver: joiResolver(commentValidator)
    });
    const {me} = useAppSelector(state => state.authReducer);
    const {orders} = useAppSelector(state => state.orderReducer);
    const save: SubmitHandler<IComment> = async (comment) => {
        await dispatch(commentActions.create({order_id, comment}));
        setValue('comment', '');
    };
    const order: IOrder = orders.find(item => item.id === order_id);
    const addValidForm: boolean = order.manager && order.manager.id !== me.id;

    return (
        <form className={css.comment_form} onSubmit={handleSubmit(save)}>
            <input type="text" placeholder="Enter comment" {...register('comment')}/>
            <button className={css.button_comment} disabled={!isValid || addValidForm}>Add</button>
            {errors.comment && <div className={css.err_comment}>{errors.comment.message}</div>}
        </form>
    );
};

export {
    CommentForm
};
