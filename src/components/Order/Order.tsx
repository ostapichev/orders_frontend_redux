import {FC, MouseEventHandler, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import {Comment} from "../Comment/Comment";
import {CommentForm} from "../CommentForm/CommentForm";
import {CommentsPaginate} from "../CommentsPaginate/CommentsPaginate";
import {commentActions, orderActions} from "../../redux";
import {DateFormat} from "../DateFormat/DateFormat";
import {IComment, IGroup, IOrder} from "../../interfaces";
import {IFuncVoid} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks";

import {button_css, form_css} from '../../styles/index';
import css from './Order.module.css';

interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {startShowComment, endShowComments, errorsComment} = useAppSelector(state => state.commentReducer);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);
    const handleDetail: MouseEventHandler<HTMLDivElement> = () => setShowDetail(prev => !prev);
    const handleShow: MouseEventHandler<HTMLDivElement> = () => setShowComment(true);
    const handleClose: IFuncVoid = () => {
        setShowComment(false);
        dispatch(commentActions.setDefaultPaginate());
    };
    const setUpdate: IFuncVoid = () => dispatch(orderActions.setOrderUpdate(order));
    const getNameGroup = (group_id: number): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group && group.name) {
            return group.name;
        }
        return "all groups";
    };
    const {
        id, name, surname, email, phone, age, course, course_format, course_type,
        status, sum, already_paid, group, created_at, manager, utm, msg, comments
    } = order;
    const addValidForm: boolean = order.manager && order.manager?.id !== me?.id;
    const nameGroup: string = getNameGroup(group);
    const lastComments: IComment[] = comments.slice(0, 3);
    const PaginateComments: IComment[] = comments.slice(startShowComment, endShowComments);

    return (
        <>
            <div className={css.block_data} onClick={handleDetail}>
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
                <div>{<DateFormat originalDate={created_at} />}</div>
                <div>{manager !== null ? manager.name : 'no manager'}</div>
            </div>
            <Collapse
                in={showDetail}
                className={css.block_detail}
            >
                <div>
                    <div className={css.left_block}>
                        <div>Message:&nbsp;{msg ? msg : 'no data'}</div>
                        <div>UTM:&nbsp;{utm ? utm : 'no data'}</div>
                        <div>
                            <button disabled={addValidForm}
                                    className={button_css.btn_open}
                                    onClick={setUpdate}
                            >
                                Edit
                            </button>
                            { order.manager && order.manager?.id !== me?.id &&
                                <div className={form_css.err_text}>
                                    You cannot comment and edit this order. It belongs to another manager.
                                </div>
                            }
                        </div>
                    </div>
                    <div className={css.right_block}>{comments.length < 1 ? 'No comments.' : 'Comments:'}
                        <div
                            className={comments.length > 0 ? css.comments_field : 'd-none'}
                            onClick={handleShow}
                        >
                            <ListGroup>
                                <ListGroup.Item action variant="success">
                                    { comments &&
                                        lastComments.map(commentBody => <Comment
                                            key={commentBody.id}
                                            commentBody={commentBody}
                                        />)
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <Modal size="xl"
                               show={showComment}
                               onHide={handleClose}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Comments</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={css.comments_field_modal}>
                                <ListGroup>
                                    <ListGroup.Item variant='info'>
                                        { comments &&
                                            PaginateComments.map(commentBody => <Comment
                                                key={commentBody.id}
                                                commentBody={commentBody}
                                            />)
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Modal.Body>
                            <CommentsPaginate comments={comments} />
                            <Modal.Footer>
                                <Button type="button" variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <CommentForm order_id={id} />
                        { errorsComment && <div className={form_css.err_text}>{errorsComment.comment}</div> }
                    </div>
                </div>
            </Collapse>
        </>
    );
};

export {
    Order
};
