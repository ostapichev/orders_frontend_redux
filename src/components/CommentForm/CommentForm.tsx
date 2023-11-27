import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {commentActions} from "../../redux";
import {commentValidator} from "../../validators";
import {IComment} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch} from "../../hooks";

import css from './CommentForm.module.css';


interface IProps {
    order_id: number;
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
        <>
            <InputGroup>
                <Form.Control className={css.comment_form} placeholder="Enter comment"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              {...register('comment')}/>
                <Button onClick={handleSubmit(save)} disabled={!isValid} variant="success" id="button-addon2">
                    Add comment
                </Button>
            </InputGroup>
            {errors.comment && <div>{errors.comment.message}</div>}
        </>
    );
};

export {
    CommentForm
};
