import {FC, useEffect, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, trigger} = useAppSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        dispatch(orderActions.getAll({page: query.get('page')}));
    }, [dispatch, query, trigger]);

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
