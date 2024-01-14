import { FC } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import Form from "react-bootstrap/Form";

import { authActions } from "../../redux";
import { IAuth } from "../../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { passwordValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";

import main_css from '../../styles/main.module.css';

import { okten_school } from "../../asserts";


interface IProps {
    funcName: string;
}

const RegisterFormApp: FC<IProps> = ({ funcName }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formData: FormData = new FormData();
    const { token } = useParams<{ token: string }>();
    const { confirmError, error, loading } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, getValues, formState: { errors } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(passwordValidator)
    });
    const recoveryRequestUser: SubmitHandler<IAuth> = async () => {
        const { password, confirmPassword } = getValues();
        formData.append('password', password);
        if (password !== confirmPassword) {
            dispatch(authActions.setConfirmError('Password mismatch!'));
            return;
        }
        if (funcName === 'recoveryPasswordPage') {
            const { meta: { requestStatus } } = await dispatch(authActions.recoveryRequestPassword(
                { formData, token }
            ));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else if (funcName === 'activateRequestUser') {
            const { meta: { requestStatus } } = await dispatch(authActions.activateRequestUser(
                { formData, token }
            ));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else {
            alert('Name error function')
        }

    };

    return (
        <div>
            <div className={ main_css.form_block }>
                <img className={ main_css.logo_form } src={ okten_school } alt='logo' />
                <Form
                    className={ main_css.login_form }
                    onSubmit={ handleSubmit(recoveryRequestUser) }
                >
                    <label>Password</label>
                    <Form.Control
                        size="sm"
                        type="password"
                        placeholder='enter password'
                        autoComplete='on'
                        { ...register('password',{ required: true }) }
                    />
                    <label>Confirm password</label>
                    <Form.Control
                        size="sm"
                        type="password"
                        placeholder='enter password'
                        autoComplete='on'
                        { ...register('confirmPassword',{ required: true }) }
                    />
                    <button className= {main_css.btn_submit } disabled={ loading }>Submit</button>
                    { errors.password && <p className={ main_css.err_text }>{ errors.password.message }</p> }
                    { confirmError && <p className={ main_css.err_text }>{ confirmError }</p> }
                    { error?.detail && <p className={ main_css.err_text }>{ error.detail }</p> }
                </Form>
            </div>
        </div>
    );
};

export {
    RegisterFormApp
};
