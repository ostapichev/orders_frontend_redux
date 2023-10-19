import {FC} from 'react';
import {Link, Outlet} from "react-router-dom";

import {Groups, GroupsPagination, Loading} from "../../components";
import {useAppSelector} from "../../hooks";


const GroupsPage: FC = () => {
    const {loading} = useAppSelector(state => state.groupReducer);

    return (
        <div>
            <ul>
                <li><Link to={'/orders'}>orders</Link></li>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
            <hr/>
            {loading && <Loading/>}
            <Outlet/>
            <Groups/>
            <GroupsPagination/>
        </div>
    );
};

export {
    GroupsPage
};

