import {FC, useEffect, useState} from 'react';

import {IOrder} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderService} from "../../services";


const Orders: FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    useEffect(() => {
        orderService.getAll()
            .then(value => value.data)
            .then(value => setOrders(value.result));
    }, []);
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
