import {FC} from 'react';
import {useAppDispatch} from "../../hooks";
import {orderActions, userActions} from "../../redux";

import css from './Button.module.css'


interface IProps {
    buttonName: string;
    func: string;
}

const Button: FC<IProps> = ({buttonName, func}) => {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        switch (func) {
            case 'OpenOrderForm':
                dispatch(orderActions.openForm());
                break;
            case 'OpenUserForm':
                dispatch(userActions.openUserForm());
                break;
        }

    };

    return (
        <div className={css.block_button}>
            <button className={css.btn_open} onClick={handleOpen}>{buttonName}</button>
        </div>
    );
};

export {
    Button
};
