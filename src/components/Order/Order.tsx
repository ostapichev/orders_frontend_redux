import React, {FC, useState} from 'react';

import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Comment} from "../Comment/Comment";
import {CommentForm} from "../CommentForm/CommentForm";
import {DateFormat} from "../DateFormat/DateFormat";
import {IComment, IGroup, IOrder} from "../../interfaces";
import {IOrderBy} from "../../types";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Order.module.css';
import css_button from '../ButtonOpenForm/ButtonOpenForm.module.css';
import {MyPagination} from "../MyPagination/MyPagination";


interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({order}) => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {pageComments, totalPageComments} = useAppSelector(state => state.commentReducer);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);
    const handleClose = () => setShowComment(false);
    const handleShow = () => setShowComment(true);
    const {errorsComment} = useAppSelector(state => state.commentReducer);
    const addValidForm: boolean = order.manager && order.manager.id !== me.id;
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
    const setUpdate: IOrderBy = () => dispatch(orderActions.setOrderUpdate(order));
    const getNameGroup = (group_id: number): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group && group.name) {
            return group.name;
        }
        return "all groups";
    };
    const nameGroup: string = getNameGroup(group);
    const lastComments: IComment[] = comments.slice(Math.max(comments.length - 3, 0));

    return (
        <>
            <div className={css.block_data} onClick={() => setShowDetail(prev => !prev)}>
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
            <div className={showDetail ? css.block_detail : css.none_data}>
                <div className={css.left_block}>
                    <div>Message: {msg !== null ? msg : 'no data'}</div>
                    <div>UTM: {utm !== null ? utm : 'no data'}</div>
                    <div>
                        <button disabled={addValidForm || (order.manager === null)}
                                className={css_button.btn_open}
                                onClick={setUpdate}>Edit
                        </button>
                    </div>
                </div>
                <div className={css.right_block}>{comments.length === 0 ? 'No comments.' : 'Comments:'}
                    <div className={comments.length !== 0 ? css.comments_field : css.comments_none} onClick={handleShow}>
                        <ListGroup>
                            <ListGroup.Item action variant="success">
                                {comments &&
                                    lastComments.map(commentBody => <Comment
                                        key={commentBody.id}
                                        commentBody={commentBody}
                                    />)
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
                                            comments.map(commentBody => <Comment
                                                key={commentBody.id}
                                                commentBody={commentBody}
                                            />)
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Modal.Body>
                        <MyPagination namePage={'comments'}/>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <CommentForm order_id={id}/>
                    {errorsComment && <div>{errorsComment.comment}</div>}
                </div>
            </div>
        </>
    );
};

export {
    Order
};
