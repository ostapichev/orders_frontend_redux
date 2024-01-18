import { FC } from 'react';

import { useAppSelector } from "../../hooks";
import { Loading, PaginationApp, SearchUser, StatisticOrder, UserForm, Users } from "../../components";

import { page_css } from '../../styles/index';


const AdminPage: FC = () => {
    const { loading, openUserForm } = useAppSelector(state => state.adminReducer);

    return (
        <div className='d-flex flex-column align-items-center'>
            <StatisticOrder />
            { loading && <Loading /> }
            <div className={ loading ? 'd-none' : 'd-flex flex-column align-items-center' }>
                <UserForm />
                <SearchUser />
                <PaginationApp namePage='adminPage' />
                <Users />
                <PaginationApp namePage='adminPage' />
            </div>
            <div className={ openUserForm ? page_css.overlay : '' }></div>
        </div>
    );
};

export {
    AdminPage
};
