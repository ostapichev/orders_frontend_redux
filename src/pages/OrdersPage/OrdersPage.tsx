import {FC} from 'react';
import {Link} from "react-router-dom";

import {GroupForm, Loading, OrderForm, Orders} from "../../components";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";
import {useAppSelector} from "../../hooks";


const OrdersPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.userReducer);
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
