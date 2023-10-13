import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Orders} from "../../components/Orders/Orders";


const OrdersPage: FC = () => {
    return (
        <div>
            <Outlet/>
            <Orders/>
        </div>
    );
};

export {
    OrdersPage
};
