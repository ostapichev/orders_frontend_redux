import {FC, MouseEventHandler} from 'react';

import {Loading} from "../Loading/Loading";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";


const GetExelFile: FC = () => {
    const {loading, fileDataURL, errors} = useAppSelector(state => state.orderReducer);
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
