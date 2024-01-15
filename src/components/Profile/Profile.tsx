import {FC, useEffect, useState} from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import { adminActions } from "../../redux";
import { DateFormat } from "../DateFormat/DateFormat";
import { IFuncVoid } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from "./Profile.module.css";


const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState<boolean>(false);
    const { me } = useAppSelector(state => state.authReducer);
    const { userStatistic } = useAppSelector(state => state.adminReducer);
    const { email, profile, created_at } = me;
    const { id, name, surname } = profile;
    const { count_orders, in_work, agree, disagree, dubbing } = userStatistic;
    const handleClose: IFuncVoid = () => setAccount(false);
    const handleShow: IFuncVoid = () => setAccount(true);
    useEffect(() => {
        dispatch(adminActions.getStatisticUser({ id }))
    }, [dispatch, id]);

    return (
        <>
            <Button
                className='d-flex flex-column align-items-center'
                variant="light"
                onClick={ handleShow }
            >
                <div className={ css.title_username }>Current user</div>
                <div className={ css.login_name }>{ surname }</div>
            </Button>
            <Modal
                show={ account }
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>My profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>ID:</span><span className="fw-bold">{ id }</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Name:</span><span className="fw-bold">{ name }</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Surname:</span><span className="fw-bold">{ surname }</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Email:</span><span className="fw-bold">{ email }</span>
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            variant="light"
                        >
                            <span>Created:</span>
                            <span className="fw-bold">{ <DateFormat originalDate={ created_at }/> }</span>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup as="ol" className='mt-2'>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Total orders:</div>
                            </div>
                            <Badge bg="primary" pill>{ count_orders }</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">In work:</div>
                            </div>
                            <Badge bg="primary" pill>{ in_work }</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Agree:</div>
                            </div>
                            <Badge bg="primary" pill>{ agree }</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Disagree:</div>
                            </div>
                            <Badge bg="primary" pill>{ disagree }</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw">Dubbing:</div>
                            </div>
                            <Badge bg="primary" pill>{ dubbing }</Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={ handleClose }
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
