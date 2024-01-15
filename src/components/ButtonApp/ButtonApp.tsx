import { FC } from 'react';

import { useAppDispatch } from "../../hooks";
import { adminActions } from "../../redux";
import { IFuncVoid } from "../../types";

import { button_css } from '../../styles/index';


const ButtonApp: FC = () => {
    const dispatch = useAppDispatch();
    const handleOpen: IFuncVoid = () => {
        dispatch(adminActions.openUserForm());
    };

    return (
        <>
            <button className={ button_css.btn_open } onClick={ handleOpen }>Create</button>
        </>
    );
};

export {
    ButtonApp
};
