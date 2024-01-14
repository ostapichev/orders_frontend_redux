import { FC } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from 'react-bootstrap/Form';

import { IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminActions } from "../../redux";
import { userValidator } from "../../validators";

import css from './UserForm.module.css';
import btn_css from "../../styles/buton.module.css";
import main_css from "../../styles/main.module.css";


const UserForm: FC = () => {
    const dispatch = useAppDispatch();
    const { openUserForm, errorUser } = useAppSelector(state => state.adminReducer);
    const { handleSubmit, register, reset, formState: { isValid, errors } } = useForm<IUser>({
        mode: 'all',
        resolver: joiResolver(userValidator)
    });
    const handleClose = () => {
        dispatch(adminActions.closeUserForm());
        reset();
    };
    const save: SubmitHandler<IUser> = async (user) => {
        await dispatch(adminActions.create({ user }));
        reset();
    };

    return (
        <div className={ `${ main_css.modal_form } ${ openUserForm ? css.user_form : 'd-none' }` }>
            <h4 className={ css.user_form_header }>Create new user</h4>
            <Form onSubmit={ handleSubmit(save) }>
                <label htmlFor='name'>name</label>
                <Form.Control
                    size="sm"
                    name='name'
                    type="text"
                    placeholder='enter name'
                    { ...register('profile.name') }
                />
                { errorUser?.name && <p className={main_css.err_text}>{ errorUser.name }</p> }
                <label htmlFor='surname'>surname</label>
                <Form.Control
                    size="sm"
                    name='surname'
                    type="text"
                    placeholder='enter surname'
                    { ...register('profile.surname') }
                />
                { errorUser?.surname && <p className={main_css.err_text}>{ errorUser.surname }</p> }
                <label htmlFor='email'>email</label>
                <Form.Control
                    size="sm"
                    name='email'
                    type="email"
                    placeholder='enter email'
                    { ...register('email') }
                />
                { errors.email && <p className={ main_css.err_text }>{ errors.email.message }</p> }
                <div className={css.buttons_user_form}>
                    <button className={ btn_css.btn_form } disabled={ !isValid }>save</button>
                    <button className={ btn_css.btn_form } onClick={ handleClose }>cancel</button>
                </div>
            </Form>
        </div>
    );
};

export {
    UserForm
};
