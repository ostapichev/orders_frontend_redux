import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {authActions} from "../../redux";
import {useNavigate, useParams} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "../../validators";


const ActivateForm: FC = () => {
    const {token} = useParams<{token: string}>();
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
            console.error('Пароли не совпадают');
            return;
        }
        const {meta: {requestStatus}} = await dispatch(authActions.activateRequestUser({formData, token}));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(activateRequestUser)}>
                <input type="password" placeholder={'password'} {...register("password")}/>
                <input type="password" placeholder={'confirm password'} {...register("confirmPassword")}/>
                <button>Activate</button>
                    {errors.password && <p>{errors.password.message}</p>}
            </form>
        </div>
    );
};

export {
    ActivateForm
};
