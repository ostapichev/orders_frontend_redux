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
import css_table from '../Orders/Orders.module.css';
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
            <div className={css.table_block} onClick={() => setShow(prev => !prev)}>
                <ListGroup className={`${css_table.table_data} ${css.block_data}`} horizontal>
                    <ListGroup.Item>{id}</ListGroup.Item>
                    <ListGroup.Item>{name}</ListGroup.Item>
                    <ListGroup.Item>{surname}</ListGroup.Item>
                    <ListGroup.Item>{email}</ListGroup.Item>
                    <ListGroup.Item>{phone}</ListGroup.Item>
                    <ListGroup.Item>{age}</ListGroup.Item>
                    <ListGroup.Item>{course}</ListGroup.Item>
                    <ListGroup.Item>{course_format}</ListGroup.Item>
                    <ListGroup.Item>{course_type}</ListGroup.Item>
                    <ListGroup.Item>{status}</ListGroup.Item>
                    <ListGroup.Item>{sum}</ListGroup.Item>
                    <ListGroup.Item>{already_paid}</ListGroup.Item>
                    <ListGroup.Item>{nameGroup}</ListGroup.Item>
                    <ListGroup.Item>{<DateFormat originalDate={created_at}/>}</ListGroup.Item>
                    <ListGroup.Item>{manager !== null ? manager.name : 'no manager'}</ListGroup.Item>
                </ListGroup>
            </div>
            <div className={show ? css.block_detail : css.none_data}>
                <div className={css.left_block}>
                    <div>message: {msg !== null ? msg : 'no data'}</div>
                    <div>utm: {utm !== null ? utm : 'no data'}</div>
                    <div>
                        <button className={css_button.btn_open} onClick={setUpdate}>Edit</button>
                    </div>
                </div>
                <div className={css.right_block}>
                    <div className={css.comments_field} onClick={handleShow}>
                        <ListGroup>
                            <ListGroup.Item action variant="success">
                                {comments &&
                                    comments.map(commentBody => <Comment key={commentBody.id} className={'comment_body'} commentBody={commentBody}/>)
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
                                        comments.map(commentBody => <Comment key={commentBody.id} className={'comment_modal'} commentBody={commentBody}/>)
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className={css.input_comment}>
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
