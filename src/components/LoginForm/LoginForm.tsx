import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux";
import {authValidator} from "../../validators";
import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch, useAppSelector} from "../../hooks";


const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {isValid}} = useForm<IAuth>({
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
        <div>
            <form onSubmit={handleSubmit(login)}>
                <input type="email" placeholder={'email'} {...register('email', {required: true})}/>
                <input type="password" placeholder={'password'} {...register('password', {required: true})}/>
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
};

export {
    LoginForm
};
