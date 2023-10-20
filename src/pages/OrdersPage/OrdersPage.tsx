import {FC} from 'react';
import {Link} from "react-router-dom";

import {Loading, Orders} from "../../components";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";
import {useAppSelector} from "../../hooks";


const OrdersPage: FC = () => {
    const {loading} = useAppSelector(state => state.userReducer);

    return (
        <div>
            <ul>
                <li><Link to={'/groups'}>groups</Link></li>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
            {loading && <Loading/>}
            <Orders/>
            <OrdersPagination/>
        </div>
    );
};

export {
    OrdersPage
};
