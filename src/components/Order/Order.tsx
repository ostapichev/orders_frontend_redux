import {FC, useEffect} from 'react';

import Accordion from 'react-bootstrap/Accordion';

import {Comment} from "../Comment/Comment";
import {CommentForm} from "../CommentForm/CommentForm";
import {DateFormat} from "../DateFormat/DateFormat";
import {IGroup, IOrder} from "../../interfaces";
import {commentActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Order.module.css';


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const {groups} = useAppSelector(state => state.groupReducer);
    const {triggerComment, errors} = useAppSelector(state => state.commentReducer);
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
    const setUpdate = () => dispatch(orderActions.setOrderUpdate(order));
    const getNameGroup = (group_id: number): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group && group.name) {
            return group.name;
        }
        return "all groups";
    };
    const nameGroup = getNameGroup(group);
    useEffect(() => {
        dispatch(commentActions.getAll({order_id: id}));
    }, [dispatch, triggerComment, id]);

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className={css.block_table}>
                        <div className={css.table_order}>
                            <div>{id}</div>
                            <div>{name}</div>
                            <div>{surname}</div>
                            <div>{email}</div>
                            <div>{phone}</div>
                            <div>{age}</div>
                            <div>{course}</div>
                            <div>{course_format}</div>
                            <div>{course_type}</div>
                            <div>{status}</div>
                            <div>{sum}</div>
                            <div>{already_paid}</div>
                            <div>{nameGroup}</div>
                            <div>{<DateFormat originalDate={created_at}/>}</div>
                            <div>{manager !== null ? manager.name : 'no manager'}</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <div>utm: {utm !== null ? utm : 'no data'}</div>
                            <div>msg: {msg !== null ? msg : 'no data'}</div>
                            <button onClick={setUpdate}>Edit order</button>
                            <CommentForm order_id={id}/>
                            {errors && <p>{errors.comment}</p>}
                            <div>
                                comments: { comments &&
                                comments.map(commentBody => <Comment key={commentBody.id} commentBody={commentBody}/>)
                            }
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export {
    Order
};
