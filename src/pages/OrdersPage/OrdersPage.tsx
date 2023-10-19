import {FC} from 'react';
import {Link, Outlet} from "react-router-dom";

import {Orders} from "../../components";
import {OrderPagination} from "../../components/OrderPagination/OrderPagination";


const OrdersPage: FC = () => {
    return (
        <div>
            <ul>
                <li><Link to={'/groups'}>groups</Link></li>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
            <Outlet/>
            <Orders/>
            <OrderPagination/>
        </div>
    );
};

export {
    OrdersPage
};
