import {FC} from 'react';

import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";


const UserForm: FC = () => {
    const {handleSubmit, register, reset} = useForm();
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IUser> = async (user) => {
        await dispatch(userActions.create({user}));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={'name'} {...register('profile.name')}/>
            <input type="text" placeholder={'surname'} {...register('profile.surname')}/>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <button>save</button>
        </form>
    );
};

export {
    UserForm
};
