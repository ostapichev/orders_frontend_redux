import {FC, useEffect, useRef} from 'react';

import {IOrderState} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {orderService} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";


const Orders: FC = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector((state: {orders: IOrderState}) => state.orders);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        orderService.getAll(+query.get('page'))
            .then(value => value.data)
            .then(value => dispatch(orderActions.setOrders(value)))
    }, [query, dispatch]);
    return (
        <div>
            {
                orders.map(order => <Order key={order.id} order={order}/>)
            }
        </div>
    );
};

export {
    Orders
};
