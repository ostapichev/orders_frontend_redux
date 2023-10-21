import {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions} from "../../redux";
import {Group} from "../Group/Group";
import {IOrder} from "../../interfaces";

const GroupsSelect: FC = () => {
    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const {register} = useForm<IOrder>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch, trigger]);

    return (
        <select name="group" {...register("group")}>
            {
                groups.map(group => <Group key={group.id} group={group}/>)
            }
        </select>
    );
};

export {
    GroupsSelect
};