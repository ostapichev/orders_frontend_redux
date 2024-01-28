import { FC } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';

import { authActions } from "../../redux";
import { authValidator } from "../../validators";
import { IAuth } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { button_css, form_css} from '../../styles/index';

import { okten_school } from '../../asserts';


const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(state => state.authReducer)
    const navigate = useNavigate();
    const [query] = useSearchParams();
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
        <div className={ form_css.form_block }>
            <img className={ form_css.logo_form } src={ okten_school } alt='logo'/>
            <Form
                className={ form_css.login_form }
                onSubmit={ handleSubmit(login) }
            >
                <label htmlFor="email">Email</label>
                <Form.Control
                    type="email"
                    name="email"
                    size="sm"
                    placeholder='enter email'
                    { ...register('email',{ required: true }) }
                />
                { errors.email && <p className={ form_css.err_text }>{ errors.email.message }</p> }
                <label htmlFor="password">Password</label>
                <Form.Control
                    type="password"
                    name="password"
                    size="sm"
                    placeholder='enter password'
                    autoComplete='on'
                    { ...register('password',{ required: true }) }
                />
                { errors.password && <p className={ form_css.err_text }>{ errors.password.message }</p> }
                <button
                    type="submit"
                    className={ button_css.btn_submit }
                    disabled={ loading }
                >
                    { loading ? 'Loading' : 'Login' }
                </button>
                { query.get('expSession') && <p className={ form_css.err_text }>Please login!</p> }
                { error?.detail && <p className={ form_css.err_text }>{ error.detail }</p> }
            </Form>
        </div>
    );
};

export {
    LoginForm
};
