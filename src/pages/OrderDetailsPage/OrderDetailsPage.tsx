import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {IOrder} from "../../interfaces/order.interface";
import {OrderDetail} from "../../components/OrderDetail/OrderDetail";
import {orderService} from "../../services/order.service";
import {useAppLocation} from "../../hooks/router.hooks";

const OrderDetailsPage: FC = () => {
    const {id} = useParams();
    const {state} = useAppLocation<IOrder>();
    const [order, setOrder] = useState<IOrder>(null);
    useEffect(() => {
        if (!state) {
            orderService.getById(id)
                .then(value => value.data)
                .then(value => setOrder(value))
        } else {
            setOrder(state)
        }
    }, [id, state]);
    return (
        <div>
            {
                order && <OrderDetail order={order}/>
            }
        </div>
    );
};

export {
    OrderDetailsPage
};
