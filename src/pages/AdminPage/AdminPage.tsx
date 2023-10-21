import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {Loading, UserForm, Users} from "../../components";
import {Link} from "react-router-dom";
import {UserPagination} from "../../components/UserPagination/UserPagination";


const AdminPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.userReducer);

    return (
        <div>
            <Link to={'/'}>go to site</Link>
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