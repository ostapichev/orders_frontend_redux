import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {commentActions} from "../../redux";
import {commentValidator} from "../../validators";
import {IComment} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch} from "../../hooks";


interface IProps {
    order_id: number
}

const CommentForm: FC<IProps> = ({order_id}) => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IComment>({
        mode: "all",
        resolver: joiResolver(commentValidator)
    });
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IComment> = async (comment) => {
        await dispatch(commentActions.create({order_id, comment}));
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder="Comment" {...register('comment')}/>
                <button disabled={!isValid}>Add comment</button>
                    {errors.comment && <p>{errors.comment.message}</p>}
            </form>
        </div>
    );
};

export {
    CommentForm
};
