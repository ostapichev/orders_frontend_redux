import React, {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {Loading, PaginationApp, SearchUser, StatisticOrder, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, openUserForm} = useAppSelector(state => state.adminReducer);

    return (
        <div className={css.admin_page}>
            <StatisticOrder/>
            {loading && <Loading/>}
            <div className={loading ? css.users_none : css.users_block}>
                <UserForm/>
                <SearchUser/>
                <PaginationApp namePage={'adminPage'}/>
                <Users/>
                <PaginationApp namePage={'adminPage'}/>
            </div>
            <div className={openUserForm && css.overlay}></div>
        </div>
    );
};

export {
    AdminPage
};
