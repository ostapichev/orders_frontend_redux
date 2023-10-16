import {FC} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

import {Orders} from "../../components";
import {Pagination} from "../../components/Pagination/Pagination";


const OrdersPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/admin')}>Admin</button>
            <Outlet/>
            <Orders/>
            <Pagination/>
        </div>
    );
};

export {
    OrdersPage
};
