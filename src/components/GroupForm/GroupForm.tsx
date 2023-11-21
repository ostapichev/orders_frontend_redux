import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import Form from 'react-bootstrap/Form';

import {groupActions} from "../../redux";
import {groupValidator} from "../../validators";
import {IGroup} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './GroupForm.module.css';
import css_form from '../UserForm/UserForm.module.css';


const GroupForm: FC = () => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator)
    });
    const {openGroupForm} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(groupActions.closeGroupForm());
        reset();
    };
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({group}));
        reset();
    };

    return (
        <div className={`${css.group_form} ${openGroupForm ? css.open_group_form : css.close_group_form }`}>
            <h5 className={css.group_form_header}>Create new group</h5>
            <form className={css.group_form_block} onSubmit={handleSubmit(save)}>
                <label>Create new group</label>
                <Form.Control size="sm" placeholder={'enter name group'} {...register('name')}/>
                    {errors.name && <p className={css.err_group_form}>{errors.name.message}</p>}
                <div className={css_form.buttons_user_form}>
                    <button className={css_form.btn_user_form} disabled={!isValid}>save</button>
                    <button className={css_form.btn_user_form} onClick={handleClose}>cancel</button>
                </div>
            </form>
        </div>
    );
};

export {
    GroupForm
};
