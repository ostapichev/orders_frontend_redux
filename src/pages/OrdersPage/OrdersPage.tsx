import {FC} from 'react';
import {Link} from "react-router-dom";

import {Button, GroupForm, Loading, OrderForm, Orders} from "../../components";
import {useAppSelector} from "../../hooks";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";


const OrdersPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.orderReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const isAdmin = me?.is_superuser || false;

    return (
        <div>
            { isAdmin &&
                <ul>
                    <li><Link to={'/admin'}>admin panel</Link></li>
                </ul>
            }
            <GroupForm/>
            <OrderForm/>
            <Button/>
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
