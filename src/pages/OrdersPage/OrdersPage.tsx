import React, {FC} from 'react';

import {
    GroupForm,
    InputBlock,
    Loading,
    MyBlockButton,
    OrderForm,
    Orders
} from "../../components";
import {useAppSelector} from "../../hooks";
import {OrdersPagination} from "../../components/OrdersPagination/OrdersPagination";

import css from './OrdersPage.module.css';
import css_page from '../AdminPage/AdminPage.module.css';


const OrdersPage: FC = () => {
    const {loading, openOrderForm} = useAppSelector(state => state.orderReducer);
    const {openGroupForm} = useAppSelector(state => state.groupReducer);

    return (
        <div className={css.order_page}>
            <div className={css.inputs_actions}>
                <InputBlock/>
                <MyBlockButton/>
            </div>
            {loading && <Loading/>}
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
