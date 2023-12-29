import {FC, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import Form from "react-bootstrap/Form";

import {GetExelFile} from "../GetExelFile/GetExelFile";
import {IOrderBy} from "../../types";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from "./MyBlockButton.module.css";

import {create, reload} from '../../asserts';


const MyBlockButton: FC = () => {
    const dispatch = useAppDispatch();
    const {checkbox} = useAppSelector(state => state.orderReducer);
    const [, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const handler: IOrderBy = () => {
        dispatch(orderActions.setCheckBox());
    };
    const createOrder: IOrderBy = () => {
        dispatch(orderActions.openForm());
    };
    const resetParams: IOrderBy = () => {
        setQueryRef.current(prev => ({...prev, order_by: '-id'}));
        dispatch(orderActions.setDefaultParams());
    };

    return (
        <div className={css.block_filters}>
            <div className={css.filter_order_check}>
                <Form.Check checked={checkbox} aria-label="My_orders" name="myOrders" inline onChange={handler}/>
                <label className={css.my} htmlFor="myOrders">My orders</label>
            </div>
            <div className={css.icon_block}>
                <img className={css.icon} onClick={resetParams} src={reload} alt='create_icon'/>
                <img className={css.icon} onClick={createOrder} src={create} alt='create_icon'/>
                <GetExelFile/>
            </div>
        </div>
    );
};

export {
    MyBlockButton
};
