import React, {FC, useEffect, useState} from 'react';

import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Comment} from "../Comment/Comment";
import {CommentForm} from "../CommentForm/CommentForm";
import {DateFormat} from "../DateFormat/DateFormat";
import {IGroup, IOrder} from "../../interfaces";
import {commentActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Order.module.css';
import css_button from '../ButtonOpenForm/ButtonOpenForm.module.css';


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const {groups} = useAppSelector(state => state.groupReducer);
    const [show, setShow] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const handleClose = () => setShowComment(false);
    const handleShow = () => setShowComment(true);
    const {triggerComment, errorsComment} = useAppSelector(state => state.commentReducer);
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
            <div className={css.block_data} onClick={() => setShow(prev => !prev)}>
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
            <div className={show ? css.block_detail : css.none_data}>
                <div className={css.left_block}>
                    <div>Message: {msg !== null ? msg : 'no data'}</div>
                    <div>UTM: {utm !== null ? utm : 'no data'}</div>
                    <div>
                        <button className={css_button.btn_open} onClick={setUpdate}>Edit</button>
                    </div>
                </div>
                <div className={css.right_block}>
                    <div className={css.comments_field} onClick={handleShow}>
                        <ListGroup>
                            <ListGroup.Item action variant="success">
                                {comments &&
                                    comments.map(commentBody => <Comment key={commentBody.id} commentBody={commentBody}/>)
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <Modal show={showComment} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Comments</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={css.comments_field_modal} onClick={handleShow}>
                            <ListGroup>
                                <ListGroup.Item action variant="success">
                                    {comments &&
                                        comments.map(commentBody => <Comment key={commentBody.id} commentBody={commentBody}/>)
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <div>
                        <CommentForm order_id={id}/>
                        {errorsComment && <div>{errorsComment.comment}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export {
    Order
};
