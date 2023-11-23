import React, {FC} from 'react';

import {ButtonOpenForm, GetExelFile, GroupForm, Loading, OrderForm, Orders} from "../../components";
import {useAppSelector} from "../../hooks";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";

import css from './OrdersPage.module.css';
import css_page from '../AdminPage/AdminPage.module.css';


const OrdersPage: FC = () => {
    const {loading, openOrderForm} = useAppSelector(state => state.orderReducer);
    const {openGroupForm} = useAppSelector(state => state.groupReducer);

    return (
        <div className={css.order_page}>
            {loading && <Loading/>}
            <div className={loading ? css.orders_none : css.button_block}>
                <h3 className={css.actions_header}>Actions</h3>
                <ButtonOpenForm buttonName={'Create group'} func={'OpenGroupForm'}/>
                <ButtonOpenForm buttonName={'Create order'} func={'OpenOrderForm'}/>
                <GetExelFile/>
            </div>
            <div className={loading ? css.orders_none : css.orders_block}>
                <Orders/>
                <OrdersPagination/>
                <GroupForm/>
                <OrderForm/>
            </div>

            <div className={(openGroupForm || openOrderForm) && css_page.overlay}></div>
        </div>
    );
};

export {
    OrdersPage
};
