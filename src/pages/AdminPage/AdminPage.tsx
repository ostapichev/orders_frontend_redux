import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {Loading, StatisticOrder, UserForm, Users} from "../../components";

import css from './AdminPage.module.css';


const AdminPage: FC = () => {
    const {loading, openUserForm} = useAppSelector(state => state.adminReducer);

    return (
        <div className={`${css.admin_page} ${loading} && ${css.open_user_form}`}>
            <StatisticOrder/>
            {loading && <Loading/>}
            <UserForm/>
            <div className={openUserForm && css.overlay}></div>
            <Users/>
        </div>
    );
};

export {
    AdminPage
};
