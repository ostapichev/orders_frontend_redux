import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";

import Form from 'react-bootstrap/Form';

import {authActions} from "../../redux";
import {authValidator} from "../../validators";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './LoginForm.module.css';

import {okten_school} from '../../asserts';


const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const {error, loading} = useAppSelector(state => state.authReducer)
    const navigate = useNavigate();
    const [query,] = useSearchParams();
    const {handleSubmit, register, formState: {errors}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });
    const login: SubmitHandler<IAuth> = async (user) => {
        if (localStorage.getItem('access') || localStorage.getItem('refresh')) {
            localStorage.clear();
        }
        const {meta: {requestStatus}} = await dispatch(authActions.login(user));
        if (requestStatus === 'fulfilled') {
            navigate('/orders');
        }
    };

    return (
        <div className={css.form_block} onSubmit={handleSubmit(login)}>
            <img className={css.logo_form} src={okten_school} alt='logo'/>
            <form className={css.login_form}>
                <label>Email</label>
                <Form.Control size="sm" type="email" placeholder={'enter email'}
                              {...register('email',{required: true})}/>
                {errors.email && <p className={css.err_login}>{errors.email.message}</p>}
                <label>Password</label>
                <Form.Control size="sm" type="password" placeholder={'enter password'}
                              autoComplete='on'
                              {...register('password',{required: true})}/>
                {errors.password && <p className={css.err_login}>{errors.password.message}</p>}
                <button className={css.btn_submit} disabled={loading}>{loading ? 'Loading' : 'Login' }</button>
                {query.get('expSession') && <p className={css.err_login}>Please login!</p>}
                {error?.detail && <p className={css.err_login}>{error.detail}</p>}
            </form>
        </div>
    );
};

export {
    LoginForm
};
