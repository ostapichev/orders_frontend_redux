import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Orders} from "../../components";
import {Pagination} from "../../components/Pagination/Pagination";


const OrdersPage: FC = () => {
    return (
        <div>
            <Outlet/>
            <Orders/>
            <Pagination/>
        </div>
    );
};

export {
    OrdersPage
};
