import {FC} from 'react';

import {Button, GroupForm, Loading, OrderForm, Orders} from "../../components";
import {useAppSelector} from "../../hooks";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";


const OrdersPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.orderReducer);

    return (
        <div>
            <GroupForm/>
            <OrderForm/>
            <Button buttonName={'Open Form'}/>
            {errors?.name && <p>{errors.name}</p>}
            {errors?.surname && <p>{errors.name}</p>}
            {errors?.email && <p>{errors.email}</p>}
            {errors?.phone && <p>{errors.phone}</p>}
            {loading && <Loading/>}
            <Orders/>
            <OrdersPagination/>
        </div>
    );
};

export {
    OrdersPage
};
