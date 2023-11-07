import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {UserPagination} from "../../components/UserPagination/UserPagination";
import {Link} from "react-router-dom";
import {Loading, OrderStatistic, UserForm, Users} from "../../components";


const AdminPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.userReducer);

    return (
        <div>
            <ul>
                <li>
                    <Link to={'/orders'}>go to site</Link>
                </li>
            </ul>
            <OrderStatistic/>
            <UserForm/>
            {errors?.name && <p>{errors.name}</p>}
            {errors?.surname && <p>{errors.name}</p>}
            {errors?.email && <p>{errors.email}</p>}
            {loading && <Loading/>}
            <Users/>
            <UserPagination/>
        </div>
    );
};

export {
    AdminPage
};
