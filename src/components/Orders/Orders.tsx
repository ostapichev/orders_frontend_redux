import {FC, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {orderService} from "../../services";
import {useAppSelector} from "../../hooks";


const Orders: FC = () => {
    const dispatch = useDispatch();
    const {orders} = useAppSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        orderService.getAll(query.get('page'))
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
