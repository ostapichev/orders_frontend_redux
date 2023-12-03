import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {authActions} from "../../redux";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useParams} from "react-router-dom";

import css from "../LoginForm/LoginForm.module.css";

import {okten_school} from "../../asserts";


interface IProps {
    funcName: string;
}

const RegisterForm: FC<IProps> = ({funcName}) => {
    const {token} = useParams<{token: string}>();
    const {confirmError, error, loading} = useAppSelector(state => state.authReducer);
    const {handleSubmit, register, getValues, formState: {errors}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(passwordValidator)
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formData: FormData = new FormData();
    const recoveryRequestUser: SubmitHandler<IAuth> = async () => {
        const {password, confirmPassword} = getValues();
        formData.append('password', password);
        if (password !== confirmPassword) {
            dispatch(authActions.setConfirmError('Password mismatch!'));
            return;
        }
        if (funcName === 'RecoveryPasswordPage') {
            const {meta: {requestStatus}} = await dispatch(authActions.recoveryRequestPassword({formData, token}));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else if (funcName === 'activateRequestUser') {
            const {meta: {requestStatus}} = await dispatch(authActions.activateRequestUser({formData, token}));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else {
            alert('Name error function')
        }

    };

    return (
        <div>
            <div className={css.form_block}>
                <img className={css.logo_form} src={okten_school} alt='logo'/>
                <form className={css.login_form}
                      onSubmit={handleSubmit(recoveryRequestUser)}>
                    <label>Password</label>
                    <input type="password" placeholder={'enter password'} {...register("password")}/>
                    <label>Confirm password</label>
                    <input type="password" placeholder={'enter confirm password'} {...register("confirmPassword")}/>
                    <button className={css.btn_submit} disabled={loading}>Submit</button>
                    {errors.password && <p className={css.err_login}>{errors.password.message}</p>}
                    {confirmError && <p className={css.err_login}>{confirmError}</p>}
                    {error?.detail && <p className={css.err_login}>{error.detail}</p>}
                </form>
            </div>
        </div>
    );
};

export {
    RegisterForm
};
