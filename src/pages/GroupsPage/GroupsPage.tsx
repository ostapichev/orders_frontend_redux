import {FC} from 'react';
import {Link} from "react-router-dom";

import {GroupForm, Groups, GroupsPagination, Loading} from "../../components";
import {useAppSelector} from "../../hooks";


const GroupsPage: FC = () => {
    const {loading} = useAppSelector(state => state.groupReducer);

    return (
        <div>
            <ul>
                <li><Link to={'/orders'}>orders</Link></li>
                <li><Link to={'/admin'}>admin panel</Link></li>
            </ul>
            <GroupForm/>
            <hr/>
            {loading && <Loading/>}
            <Groups/>
            <GroupsPagination/>
        </div>
    );
};

export {
    GroupsPage
};

