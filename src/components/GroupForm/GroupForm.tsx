import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {groupActions} from "../../redux";
import {groupValidator} from "../../validators";
import {IGroup} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './GroupForm.module.css';


const GroupForm: FC = () => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator)
    });
    const {openForm} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(groupActions.closeGroupForm());
    };
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({group}));
        reset();
    };

    return (
        <div className={`${css.group_form} ${openForm ? css.open_group_form : css.close_group_form }`}>
            <h3>Create group</h3>
            <form onSubmit={handleSubmit(save)}>
                <label className={css.form_group_name}>Create new group</label>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <button className={css.btn_group_form} disabled={!isValid}>save</button>
                <button className={css.btn_group_form} onClick={handleClose}>Cansel</button>
                    {errors.name && <p className={css.err_group_form}>{errors.name.message}</p>}
            </form>
            <hr/>
        </div>
    );
};

export {
    GroupForm
};
