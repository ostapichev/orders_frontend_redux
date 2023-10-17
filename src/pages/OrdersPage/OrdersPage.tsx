import {FC} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

import {Orders} from "../../components";
import {OrderPagination} from "../../components/OrderPagination/OrderPagination";


const OrdersPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/admin')}>Admin</button>
            <Outlet/>
            <Orders/>
            <OrderPagination/>
        </div>
    );
};

export {
    OrdersPage
};
