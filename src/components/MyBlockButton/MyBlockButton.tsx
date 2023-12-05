import {FC} from 'react';

import Form from "react-bootstrap/Form";

import {IOrderBy} from "../../types";
import {orderActions} from "../../redux";
import {useAppDispatch} from "../../hooks";

import css from "./MyBlockButton.module.css";
import css_button from "../ButtonOpenForm/ButtonOpenForm.module.css";


const MyBlockButton: FC = () => {
    const dispatch = useAppDispatch();
    const handleShow: IOrderBy = () => {
        dispatch(orderActions.setShowModal(true))
    };
    const handler: IOrderBy = () => {
        dispatch(orderActions.setCheckBox())
    }

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
