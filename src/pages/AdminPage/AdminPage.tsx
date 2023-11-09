import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {UserPagination} from "../../components/UserPagination/UserPagination";
import {Button, Loading, OrderStatistic, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, errors} = useAppSelector(state => state.userReducer);

    return (
        <div className={css.admin_page}>
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
