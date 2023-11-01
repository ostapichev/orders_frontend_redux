import {FC, useEffect, useState} from 'react';

import {Comment} from "../Comment/Comment";
import {CommentForm} from "../CommentForm/CommentForm";
import {DateFormat} from "../DateFormat/DateFormat";
import {IGroup, IOrder} from "../../interfaces";
import {commentActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Loading} from "../Loading/Loading";


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const {groups} = useAppSelector(state => state.groupReducer);
    const {triggerComment, loading, errors} = useAppSelector(state => state.commentReducer);
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
    useEffect(() => {
        dispatch(commentActions.getAll({order_id: id}));
    }, [dispatch, triggerComment, id]);

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
                    <li>sum: {sum}</li>
                    <li>already paid: {already_paid}</li>
                    <li>group: {nameGroup}</li>
                    <li>created: {<DateFormat originalDate={created_at}/>}</li>
                    <li>manager: {manager !== null ? manager.name : 'no manager'}</li>
                </ul>
            </button>
            { show &&
                <div>
                    <div>utm: {utm !== null ? utm : 'no data'}</div>
                    <div>msg: {msg !== null ? msg : 'no data'}</div>
                    <button onClick={() => dispatch(orderActions.setOrderUpdate(order))}>Edit order</button>
                    <hr/>
                    <CommentForm order_id={id}/>
                        {errors && <p>{errors.comment}</p>}
                        {loading && <Loading/>}
                    <div>
                        comments: { comments &&
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
