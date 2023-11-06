import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";


const GetExelFile: FC = () => {
    const {loading, fileDataURL, errors} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();

    const handleDownload = async () => {
        dispatch(orderActions.getExelFile())
    };
    useEffect(() => {
        return () => {
            if (fileDataURL) {
                URL.revokeObjectURL(fileDataURL);
            }
        }
    }, [fileDataURL]);

    return (
        <div>
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Загрузка...' : 'Скачать файл'}
            </button>
            {errors && <div style={{ color: 'red' }}>{errors.name}</div>}
            {fileDataURL && <a href={fileDataURL} download="orders_data.xlsx">Ссылка для скачивания файла</a>}
        </div>
    );
};

export {
    GetExelFile
};
