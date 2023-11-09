import {FC} from 'react';
import {useAppDispatch} from "../../hooks";
import {orderActions} from "../../redux";

import css from './Button.module.css'


interface IProps {
    buttonName: string;
}

const Button: FC<IProps> = ({buttonName}) => {
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        dispatch(orderActions.openForm());
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
