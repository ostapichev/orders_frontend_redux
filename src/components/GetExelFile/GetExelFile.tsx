import {FC, MouseEventHandler} from 'react';

import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import {exel} from "../../asserts";


const GetExelFile: FC = () => {
    const {fileDataURL} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();
    const getExel: MouseEventHandler = () => {
        dispatch(orderActions.getExelFile());
        if (fileDataURL) {
            const downloadLink = document.createElement('a');
            downloadLink.href = fileDataURL;
            downloadLink.download = 'orders_data.xlsx';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <>
            <img className={css.icon} onClick={getExel} src={exel} alt='create_icon'/>
        </>
    );
};

export {
    GetExelFile
};
