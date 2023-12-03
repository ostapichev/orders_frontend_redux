import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {Loading, StatisticOrder, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, openUserForm} = useAppSelector(state => state.adminReducer);

    return (
        <div className={css.admin_page}>
            {loading && <Loading/>}
            <StatisticOrder/>
            <UserForm/>
            <Users/>
            <div className={openUserForm && css.overlay}></div>
        </div>
    );
};

export {
    AdminPage
};
