import { FC, useEffect, useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import { adminActions } from "../../redux";
import { DateFormat } from "../DateFormat/DateFormat";
import { IFuncVoid } from "../../types";
import { IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from "./Profile.module.css";

interface IProps {
    me: IUser;
}

const Profile: FC<IProps> = ({ me }) => {
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState<boolean>(false);
    const {userStatistic} = useAppSelector(state => state.adminReducer);
    const {orderUpdate} = useAppSelector(state => state.orderReducer);
    const {commentTrigger} = useAppSelector(state => state.commentReducer);
    const {email, profile, created_at} = me;
    const {id, name, surname} = profile;
    const {count_orders, in_work, agree, disagree, dubbing} = userStatistic;
    const handleClose: IFuncVoid = () => setAccount(false);
    const handleShow: IFuncVoid = () => setAccount(true);
    useEffect(() => {
        dispatch(adminActions.getStatisticUser({ id }));
    }, [dispatch, orderUpdate, commentTrigger, id]);

    return (
        <>
            <Button
                type="button"
                className='d-flex flex-column align-items-center'
                variant="light"
                onClick={handleShow}
            >
                <div className={css.title_username}>Current user</div>
                <div className={css.login_name}>{name}</div>
            </Button>
            <Modal
                show={account}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>My&#160;Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>ID&#58;</span><span className="fw-bold">{id}</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Name&#58;</span><span className="fw-bold">{name}</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Surname&#58;</span><span className="fw-bold">{surname}</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Email&#58;</span><span className="fw-bold">{email}</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Created&#58;</span>
                            <span className="fw-bold">{ <DateFormat originalDate={created_at} /> }</span>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup as="ol" className='mt-2'>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Total&#160;orders&#58;</div>
                            </div>
                            <Badge bg="primary" pill>{count_orders}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">In&#160;work&#58;</div>
                            </div>
                            <Badge bg="primary" pill>{in_work}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Agree&#58;</div>
                            </div>
                            <Badge bg="primary" pill>{agree}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Disagree&#58;</div>
                            </div>
                            <Badge bg="primary" pill>{disagree}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Dubbing&#58;</div>
                            </div>
                            <Badge bg="primary" pill>{dubbing}</Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export {
    Profile
};
