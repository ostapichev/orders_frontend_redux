import { FC } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';

import { authActions } from "../../redux";
import { authValidator } from "../../validators";
import { IAuth } from "../../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAppDispatch, useAppSelector } from "../../hooks";

import main_css from '../../styles/main.module.css';

import { okten_school } from '../../asserts';


const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(state => state.authReducer)
    const navigate = useNavigate();
    const [query,] = useSearchParams();
    const { handleSubmit, register, formState: { errors } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });
    const login: SubmitHandler<IAuth> = async (user) => {
        if (localStorage.getItem('access') || localStorage.getItem('refresh')) {
            localStorage.clear();
        }
        const { meta: { requestStatus } } = await dispatch(authActions.login(user));
        if (requestStatus === 'fulfilled') {
            navigate('/orders');
        }
    };

    return (
        <div className={ main_css.form_block } onSubmit={ handleSubmit(login) }>
            <img className={ main_css.logo_form } src={ okten_school } alt='logo'/>
            <Form className={ main_css.login_form }>
                <label>Email</label>
                <Form.Control
                    size="sm"
                    type="email"
                    placeholder='enter email'
                    { ...register('email',{ required: true }) }
                />
                { errors.email && <p className={main_css.err_text}>{ errors.email.message }</p> }
                <label>Password</label>
                <Form.Control
                    size="sm"
                    type="password"
                    placeholder='enter password'
                    autoComplete='on'
                    { ...register('password',{ required: true }) }
                />
                { errors.password && <p className={ main_css.err_text }>{ errors.password.message }</p> }
                <button className={ main_css.btn_submit } disabled={ loading }>{ loading ? 'Loading' : 'Login' }</button>
                { query.get('expSession') && <p className={ main_css.err_text }>Please login!</p> }
                { error?.detail && <p className={ main_css.err_text }>{ error.detail }</p> }
            </Form>
        </div>
    );
};

export {
    LoginForm
};
