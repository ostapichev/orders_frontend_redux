import { FC } from 'react';

import { useAppDispatch } from "../../hooks";
import { adminActions } from "../../redux";
import { IFuncVoid } from "../../types";

import btn_css from '../../styles/buton.module.css';


const ButtonApp: FC = () => {
    const dispatch = useAppDispatch();
    const handleOpen: IFuncVoid = () => {
        dispatch(adminActions.openUserForm());
    }

    return (
        <>
            <button className={ btn_css.btn_open } onClick={ handleOpen }>Create</button>
        </>
    );
};

export {
    ButtonApp
};
