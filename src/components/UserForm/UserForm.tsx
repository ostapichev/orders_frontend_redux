import {FC} from 'react';
import {joiResolver} from "@hookform/resolvers/joi";
import {SubmitHandler, useForm} from "react-hook-form";

import {IUser} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";
import {userValidator} from "../../validators";


const UserForm: FC = () => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IUser>({
        mode: 'all',
        resolver: joiResolver(userValidator)
    });
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IUser> = async (user) => {
        await dispatch(userActions.create({user}));
        reset();
    };

    return (
        <div>
            <h2>Create user</h2>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={'name'} {...register('profile.name')}/>
                <input type="text" placeholder={'surname'} {...register('profile.surname')}/>
                <input type="text" placeholder={'email'} {...register('email')}/>
                    {errors.email && <p>{errors.email.message}</p>}
                <button disabled={!isValid}>save</button>
            </form>
            <hr/>
        </div>
    );
};

export {
    UserForm
};
