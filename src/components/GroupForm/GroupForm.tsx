import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {groupActions} from "../../redux";
import {groupValidator} from "../../validators/groupValidator";
import {IGroup} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAppDispatch} from "../../hooks";


const GroupForm: FC = () => {
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator)
    });
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({group}));
        reset();
    };

    return (
        <div>
            <h3>Create group</h3>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <button disabled={!isValid}>save</button>
                {errors.name && <p>{errors.name.message}</p>}
            </form>
            <hr/>
        </div>
    );
};

export {
    GroupForm
};