import {FC} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";


const GetExelFile: FC = () => {
    const {loading} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();
    const download = () => {
        dispatch(orderActions.getExelFile());
    };

    return (
        <div>
            <button onClick={download} disabled={loading}>Download</button>
            {
                <a href={'http://localhost:3000/api/orders/exel'} download="orders_data.xlsx">download</a>
            }
        </div>
    );
};

export {
    GetExelFile
};
