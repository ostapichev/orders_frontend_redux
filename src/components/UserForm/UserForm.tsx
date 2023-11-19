import {FC} from 'react';
import {joiResolver} from "@hookform/resolvers/joi";
import {SubmitHandler, useForm} from "react-hook-form";

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
    };
    const save: SubmitHandler<IUser> = async (user) => {
        await dispatch(adminActions.create({user}));
        reset();
    };

    return (
        <div className={`${css.user_form} ${openUserForm ? css.open_user_form : css.close_user_form}`}>
            <form onSubmit={handleSubmit(save)}>
                <label className={css.form_name}>Create new user</label>
                <input type="text" placeholder={'name'} {...register('profile.name')}/>
                <input type="text" placeholder={'surname'} {...register('profile.surname')}/>
                <input type="text" placeholder={'email'} {...register('email')}/>
                    {errors?.email && <p className={css.err_user_form}>{errors.email.message}</p>}
                    {errorUser?.name && <p className={css.err_user_form}>{errorUser.name}</p>}
                    {errorUser?.surname && <p className={css.err_user_form}>{errorUser.name}</p>}
                    {errorUser?.email && <p className={css.err_user_form}>{errorUser.email}</p>}
                <div className={css.buttons_user_form}>
                    <button className={css.btn_user_form} disabled={!isValid}>Save</button>
                    <button className={css.btn_user_form} onClick={handleClose}>Cansel</button>
                </div>
            </form>
        </div>
    );
};

export {
    UserForm
};
