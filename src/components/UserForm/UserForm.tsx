import {FC} from 'react';
import {joiResolver} from "@hookform/resolvers/joi";
import {SubmitHandler, useForm} from "react-hook-form";

import Form from 'react-bootstrap/Form';

import {IUser} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux";
import {userValidator} from "../../validators";

import css from './UserForm.module.css';


const UserForm: FC = () => {
    const dispatch = useAppDispatch();
    const {openUserForm, errorUser} = useAppSelector(state => state.adminReducer);
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IUser>({
        mode: 'all',
        resolver: joiResolver(userValidator)
    });
    const handleClose = () => {
        dispatch(adminActions.closeUserForm());
        reset();
    };
    const save: SubmitHandler<IUser> = async (user) => {
        await dispatch(adminActions.create({user}));
        reset();
    };

    return (
        <div className={`${css.user_form} ${openUserForm ? css.open_user_form : css.close_user_form}`}>
            <h4 className={css.user_form_header}>Create new user</h4>
            <form className={css.user_form_block} onSubmit={handleSubmit(save)}>
                <label>name</label>
                <Form.Control size="sm" type="text" placeholder={'enter name'} {...register('profile.name')}/>
                    {errorUser?.name && <p className={css.err_user_form}>{errorUser.name}</p>}
                <label>surname</label>
                <Form.Control size="sm" type="text" placeholder={'enter surname'} {...register('profile.surname')}/>
                    {errorUser?.surname && <p className={css.err_user_form}>{errorUser.name}</p>}
                <label>email</label>
                <Form.Control size="sm" type="text" placeholder={'enter email'} {...register('email')}/>
                    {errorUser?.email && <p className={css.err_user_form}>{errorUser.email}</p>}
                <div className={css.buttons_user_form}>
                    <button className={css.btn_user_form} disabled={!isValid}>save</button>
                    <button className={css.btn_user_form} onClick={handleClose}>cancel</button>
                </div>
            </form>
        </div>
    );
};

export {
    UserForm
};
