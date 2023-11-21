import {FC, MouseEventHandler} from 'react';

import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from '../ButtonOpenForm/ButtonOpenForm.module.css';


const GetExelFile: FC = () => {
    const {loading, fileDataURL} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();
    const handleDownload: MouseEventHandler<HTMLButtonElement> = async () => {
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
            <button className={css.btn_open} onClick={handleDownload} disabled={loading}>Get exel file</button>
        </>
    );
};

export {
    GetExelFile
};
