import {FC, useState} from 'react';

import {Comment} from "../Comment/Comment";
import {DateFormat} from "../DateFormat/DateFormat";
import {IGroup, IOrder} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const {groups} = useAppSelector((state) => state.groupReducer);
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const {
        id,
        name,
        surname,
        email,
        phone,
        age,
        course,
        course_format,
        course_type,
        status,
        sum,
        already_paid,
        group,
        created_at,
        manager,
        utm,
        msg,
        comments,
    } = order;
    const getNameGroup = (group_id: number): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        return group.name;
    };
    const nameGroup = getNameGroup(group);

    return (
        <div>
            <button onClick={() => setShow(prev => !prev)}>
                <ul>
                    <li>id: {id}</li>
                    <li>name: {name}</li>
                    <li>surname: {surname}</li>
                    <li>email: {email}</li>
                    <li>phone: {phone}</li>
                    <li>age: {age}</li>
                    <li>course: {course}</li>
                    <li>course format: {course_format}</li>
                    <li>course type: {course_type}</li>
                    <li>status: {status}</li>
                    <li>course: {course}</li>
                    <li>sum: {sum}</li>
                    <li>already paid: {already_paid}</li>
                    <li>group: {nameGroup}</li>
                    <li>created: {<DateFormat originalDate={created_at}/>}</li>
                    <li>manager: {manager !== null ? manager.name : 'null'}</li>
                </ul>
            </button>
            {
                show &&
                <div>
                    <div>utm: {utm !== null ? utm : 'null'}</div>
                    <div>msg: {msg !== null ? msg : 'null'}</div>
                    <button onClick={() => dispatch(orderActions.setOrderUpdate(order))}>Edit order</button>
                    <hr/>
                    <div>comments: {
                        comments.map(commentBody => <Comment key={commentBody.id} commentBody={commentBody}/>)
                    }
                    </div>
                    <hr/>
                </div>
            }
        </div>
    );
};

export {
    Order
};
