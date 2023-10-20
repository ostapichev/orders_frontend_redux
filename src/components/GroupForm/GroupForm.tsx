import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IGroup} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {groupActions} from "../../redux";

const GroupForm: FC = () => {
    const {handleSubmit, register, reset} = useForm<IGroup>();
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({group}));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <button>save</button>
            </form>
        </div>
    );
};

export {
    GroupForm
};