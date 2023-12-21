import {FC, useRef} from 'react';

import Form from "react-bootstrap/Form";

import {IOrderBy} from "../../types";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from "./MyBlockButton.module.css";
import css_button from "../ButtonOpenForm/ButtonOpenForm.module.css";
import {useSearchParams} from "react-router-dom";


const MyBlockButton: FC = () => {
    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.authReducer);
    const {checkbox} = useAppSelector(state => state.orderReducer);
    const [, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const handleShow: IOrderBy = () => {
        dispatch(orderActions.setShowModal(true));
    };
    const handler: IOrderBy = () => {
        if (checkbox) {
            setQueryRef.current(prev => ({...prev, manager: ''}))
        } else {
            setQueryRef.current(prev => ({...prev, manager: me.profile.name}));
        }
        dispatch(orderActions.setCheckBox());
    };

    return (
        <div className={css.block_filters}>
            <div className={css.filter_order_check}>
                <Form.Check aria-label="My_orders" name="myOrders" inline onChange={handler}/>
                <label className={css.my} htmlFor="myOrders">My orders</label>
            </div>
            <button className={css_button.btn_open} onClick={handleShow}>Actions</button>
        </div>
    );
};

export {
    MyBlockButton
};
