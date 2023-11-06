import {FC, MouseEventHandler} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import {Loading} from "../Loading/Loading";


const GetExelFile: FC = () => {
    const {loading, fileDataURL, errors} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();
    const handleDownload: MouseEventHandler<HTMLButtonElement> = async () => {
        dispatch(orderActions.getExelFile());
        if (fileDataURL) {
            const newWindow = window.open(fileDataURL);
            if (newWindow) {
                newWindow.focus();
            }
        }
    };

    return (
        <div>
            <button onClick={handleDownload} disabled={loading}>
                {loading ? <Loading/> : 'Download file'}
            </button>
            {errors && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
    );
};

export {
    GetExelFile
};
