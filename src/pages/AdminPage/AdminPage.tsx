import React, {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {Loading, Pagination, StatisticOrder, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, openUserForm} = useAppSelector(state => state.adminReducer);

    return (
        <div className={css.admin_page}>
            {loading && <Loading/>}
            <StatisticOrder/>
            <UserForm/>
            <Users/>
            {!loading &&
                <Pagination namePage={'adminPage'}/>
            }
            <div className={openUserForm && css.overlay}></div>
        </div>
    );
};

export {
    AdminPage
};
