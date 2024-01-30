import {FC} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {IFuncVoid} from "../../types";


const DataMessage: FC = () => {
    const dispatch = useAppDispatch();
    const {checkerMessage} = useAppSelector(state => state.authReducer);
    const handleClose: IFuncVoid = () => dispatch(authActions.closeModal());

    return (
        <>
            <Modal
                show={!!checkerMessage}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>INFO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='fw-bold fs-6 text-serif'>{JSON.parse(checkerMessage)}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export {
    DataMessage
};
