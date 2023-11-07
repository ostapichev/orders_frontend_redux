import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {authActions} from "../../redux";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useParams} from "react-router-dom";

import css from '../LoginForm/LoginForm.module.css'


const ActivateForm: FC = () => {
    const {token} = useParams<{token: string}>();
    const {confirmError, error} = useAppSelector(state => state.authReducer);
    const {handleSubmit, register, getValues, formState: {errors}} = useForm<IAuth>({
        mode: 'onSubmit',
        resolver: joiResolver(passwordValidator)
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formData: FormData = new FormData();
    const activateRequestUser: SubmitHandler<IAuth> = async () => {
        const {password, confirmPassword} = getValues();
        formData.append('password', password);
        if (password !== confirmPassword) {
            dispatch(authActions.setConfirmError('Password mismatch!'));
            return;
        }
        const {meta: {requestStatus}} = await dispatch(authActions.activateRequestUser({formData, token}));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
    };

    return (
        <div className={css.LoginForm}>
            <form className={css.lf} onSubmit={handleSubmit(activateRequestUser)}>
                <h3>OKTEN IT SCHOOL</h3>
                <input type="password" placeholder={'password'} {...register("password")}/>
                <input type="password" placeholder={'confirm password'} {...register("confirmPassword")}/>
                <button className={css.btn_login}>Activate</button>
                    {errors.password && <p className={css.err_login}>{errors.password.message}</p>}
                    {confirmError && <p className={css.err_login}>{confirmError}</p>}
                    {error && <p className={css.err_login}>{error.detail}</p>}
            </form>
        </div>
    );
};

export {
    ActivateForm
};
