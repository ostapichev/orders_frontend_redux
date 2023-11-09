import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";

import {authActions} from "../../redux";
import {authValidator} from "../../validators";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './LoginForm.module.css';


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
        const {meta: {requestStatus}} = await dispatch(authActions.login(user));
        if (requestStatus === 'fulfilled') {
            navigate('/orders');
        }
    };

    return (
        <div className={css.LoginForm}>
            <form className={css.lf} onSubmit={handleSubmit(login)}>
                <h3>OKTEN IT SCHOOL</h3>
                <label className={css.form_name}>Login form</label>
                <input type="email" placeholder={'email'} {...register('email', {required: true})}/>
                    {errors.email && <p className={css.err_login}>{errors.email.message}</p>}
                <input type="password" placeholder={'password'} {...register('password', {required: true})}/>
                    {errors.password && <p className={css.err_login}>{errors.password.message}</p>}
                <button className={css.btn_login} disabled={loading}>{loading ? 'Loading' : 'Login' }</button>
                    {query.get('expSession') && <p className={css.err_login}>Please login!</p>}
                    {error?.detail && <p className={css.err_login}>{error.detail}</p>}
            </form>
        </div>
    );
};

export {
    LoginForm
};
