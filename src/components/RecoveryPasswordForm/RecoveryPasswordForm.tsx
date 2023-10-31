import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {authActions} from "../../redux";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useParams} from "react-router-dom";


const RecoveryPasswordForm: FC = () => {
    const {token} = useParams<{token: string}>();
    const {confirmError} = useAppSelector(state => state.authReducer);
    const {handleSubmit, register, getValues, formState: {errors}} = useForm<IAuth>({
        mode: 'onSubmit',
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
        const {meta: {requestStatus}} = await dispatch(authActions.recoveryRequestPassword({formData, token}));
        if (requestStatus === 'fulfilled') {
            navigate('/login');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(recoveryRequestUser)}>
                <input type="password" placeholder={'password'} {...register("password")}/>
                <input type="password" placeholder={'confirm password'} {...register("confirmPassword")}/>
                <button>Submit</button>
                    {errors.password && <p>{errors.password.message}</p>}
                    {confirmError && <p>{confirmError}</p>}
            </form>
        </div>
    );
};

export {
    RecoveryPasswordForm
};
