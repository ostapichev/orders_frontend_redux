import {FC} from 'react';
import {useAppDispatch} from "../../hooks";
import {groupActions, orderActions, adminActions} from "../../redux";

import css from './ButtonOpenForm.module.css'


interface IProps {
    buttonName: string;
    func: string;
}

const ButtonOpenForm: FC<IProps> = ({buttonName, func}) => {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        switch (func) {
            case 'OpenOrderForm':
                dispatch(orderActions.openForm());
                break;
            case 'OpenUserForm':
                dispatch(adminActions.openUserForm());
                break;
            case 'OpenGroupForm':
                dispatch((groupActions.openGroupForm()));
                break;
            default:
                alert('Error name function for button');
        }

    };

    return (
        <>
            <button className={css.btn_open} onClick={handleOpen}>{buttonName}</button>
        </>
    );
};

export {
    ButtonOpenForm
};
