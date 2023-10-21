import {FC, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {groupActions} from "../../redux";
import {Group} from "../Group/Group";
import {GroupSelect} from "../GroupSelect/GroupSelect";
import {useForm} from "react-hook-form";
import {IOrder} from "../../interfaces";

const GroupOption: FC = () => {
    const {groups} = useAppSelector(state => state.groupReducer);
    const {register} = useForm<IOrder>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch]);

    return (
        <select name="group" {...register("group")}>
            {
                groups.map(group => <GroupSelect key={group.id} group={group}/>)
            }
        </select>
    );
};

export {
    GroupOption
};