import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import Form from 'react-bootstrap/Form';

import {groupActions} from "../../redux";
import {groupValidator} from "../../validators";
import {IGroup} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch} from "../../hooks";

import css from './GroupForm.module.css';


const GroupForm: FC = () => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator)
    });
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({group}));
        reset();
    };
    const select: any = () => {
        dispatch(groupActions.setVision());
    };

    return (
        <form className={css.group_form} onSubmit={handleSubmit(save)}>
            <label>Create new group</label>
            <Form.Control size="sm" placeholder={'enter name group'} {...register('name')}/>
            <div className={css.btn_block}>
                <button className={css.btn_group} disabled={!isValid}>save</button>
                <button className={css.btn_group} onClick={select}>select</button>
            </div>
            {errors.name && <div className={css.err_group_form}>{errors.name.message}</div>}
        </form>
    );
};

export {
    GroupForm
};
