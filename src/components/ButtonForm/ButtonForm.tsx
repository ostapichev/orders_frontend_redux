import { FC } from 'react';
import { useAppDispatch } from "../../hooks";
import { orderActions, adminActions } from "../../redux";

import main_css from '../../styles/main.module.css';


interface IProps {
    buttonName: string;
    func: string;
}

const ButtonForm: FC<IProps> = ({ buttonName, func }) => {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        switch (func) {
            case 'OpenOrderForm':
                dispatch(orderActions.openForm());
                break;
            case 'OpenUserForm':
                dispatch(adminActions.openUserForm());
                break;
            default:
                alert('Error name function for button');
        }
    };

    return (
        <>
            <button className={main_css.btn_open} onClick={ handleOpen }>{buttonName}</button>
        </>
    );
};

export {
    ButtonForm
};
