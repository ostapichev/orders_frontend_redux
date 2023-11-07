import {FC} from 'react';
import {useAppDispatch} from "../../hooks";
import {orderActions} from "../../redux";

import css from './Button.module.css'

const Button: FC = () => {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        dispatch(orderActions.openForm());
    };

    return (
        <div>
            <button className={css.btn_opn_f} onClick={handleOpen}>Open Form</button>
        </div>
    );
};

export {
    Button
};