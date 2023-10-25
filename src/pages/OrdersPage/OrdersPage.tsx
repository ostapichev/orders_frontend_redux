import {FC} from 'react';
import {Link, NavLink} from "react-router-dom";

import {GroupForm, Loading, OrderForm, Orders} from "../../components";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";
import {useAppSelector} from "../../hooks";


const OrdersPage: FC = () => {
    const {loading} = useAppSelector(state => state.userReducer);

    return (
        <div>
            <ul>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
            <GroupForm/>
            <OrderForm/>
            {loading && <Loading/>}
            <Orders/>
            <OrdersPagination/>
        </div>
    );
};

export {
    OrdersPage
};
