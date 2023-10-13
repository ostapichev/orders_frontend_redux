import {FC} from 'react';
import {IOrder} from "../../interfaces/order.interface";
import {Comments} from "../Comments/Comments";


interface IProps {
    order: IOrder;
}

const OrderDetail: FC<IProps> = ({order}) => {
    const {utm, msg} = order ?? {};
    return (
        <div>
            <div>utm: {utm !== null && utm !== undefined ? utm : 'null'}</div>
            <div>msg: {msg !== null && msg !== undefined ? msg : 'null'}</div>
            <Comments/>
        </div>
    );
};

export {
    OrderDetail
};
