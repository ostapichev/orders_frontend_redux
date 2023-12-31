import React, {FC} from 'react';

import {
    InputBlock,
    Loading,
    MyBlockButton,
    OrderForm,
    Orders,
    MyPagination
} from "../../components";
import {useAppSelector} from "../../hooks";

import css from './OrdersPage.module.css';
import css_page from '../AdminPage/AdminPage.module.css';


const OrdersPage: FC = () => {
    const {loading, openOrderForm} = useAppSelector(state => state.orderReducer);

    return (
        <div className={css.order_page}>
            <div className={css.inputs_actions}>
                <InputBlock/>
                <MyBlockButton/>
            </div>
            {loading && <Loading/>}
            <div className={loading ? css.orders_none : css.orders_block}>
                <Orders/>
                <MyPagination namePage={'homePage'}/>
                <OrderForm/>
            </div>
            <div className={openOrderForm && css_page.overlay}></div>
        </div>
    );
};

export {
    OrdersPage
};
