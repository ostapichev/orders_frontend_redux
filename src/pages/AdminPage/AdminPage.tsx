import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {UserPagination} from "../../components/UserPagination/UserPagination";
import {Loading, OrderStatistic, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, openUserForm} = useAppSelector(state => state.userReducer);

    return (
        <div className={`${css.admin_page} ${loading} && ${css.open_user_form}`}>
            <OrderStatistic/>
            {loading && <Loading/>}
            <UserPagination/>
            <UserForm/>
            <div className={openUserForm && css.overlay}></div>
            <Users/>
            <UserPagination/>
        </div>
    );
};

export {
    AdminPage
};
