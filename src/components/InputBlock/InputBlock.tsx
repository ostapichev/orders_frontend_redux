import {FC} from 'react';

import Form from "react-bootstrap/Form";

import {Group} from "../Group/Group";
import {IOrderBy} from "../../types";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './InputBlock.module.css';
import css_button from "../ButtonOpenForm/ButtonOpenForm.module.css";


const InputBlock: FC = () => {
    const dispatch = useAppDispatch();

    const handler: IOrderBy = () => sortingOrders();
    const {me} = useAppSelector(state => state.authReducer);
    const {groups} = useAppSelector(state => state.groupReducer);
    const {inputData, checkbox} = useAppSelector(state => state.orderReducer);
    const handleShow: IOrderBy = () => {
        dispatch(orderActions.setShowModal(true))
    };
    const sortingOrders: IOrderBy = () => {
        dispatch(orderActions.setCheckBox());
    };
    const nameInputChange: any = (event: any) => {
        const inputValue = event.target.value;
        dispatch(orderActions.setInputData(inputValue));
    };

    return (
        <div className={css.filter_container}>
                <div className={css.filter_order}>
                    <Form.Control value={inputData} size="sm" type="text" placeholder="Name" onChange={nameInputChange}/>
                    <Form.Control size="sm" type="text" placeholder="Surname"/>
                    <Form.Control size="sm" type="email" placeholder="email"/>
                    <Form.Control size="sm" type="text" placeholder="phone"/>
                    <Form.Control size="sm" type="number" placeholder="age"/>
                    <Form.Select size="sm" aria-label="Choose course">
                        <option>all courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JSCX</option>
                        <option value="JCX">JCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </Form.Select>
                </div>
                <div className={css.filter_order}>
                    <Form.Select size="sm" name="course_format" aria-label="Course_format">
                        <option>all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </Form.Select>
                    <Form.Select size="sm" name="course_type" aria-label="Course_type">
                        <option>all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </Form.Select>
                    <Form.Select size="sm" name="status" aria-label="Status">
                        <option>all statuses</option>
                        <option value="new_order">new_order</option>
                        <option value="in_work">in_work</option>
                        <option value="agree">agree</option>
                        <option value="disagree">disagree</option>
                        <option value="dubbing">dubbing</option>
                    </Form.Select>
                    <Form.Select size="sm" name="group" aria-label="Choose group"
                                 onChange={(event) => dispatch(orderActions.setOrderCreate(event.target.value))}>
                        <option>all groups</option>
                        {groups.map(group => <Group key={group.id} group={group}/>)}
                    </Form.Select>
                    <Form.Control size="sm" type="datetime-local" placeholder="start date"/>
                    <Form.Control size="sm" type="datetime-local" placeholder="end date"/>
                </div>
                <div className={css.block_check}>
                    <div className={css.filter_order_check}>
                        <Form.Check aria-label="My_orders" name="myOrders" inline onChange={handler}/>
                        <label className={css.my} htmlFor="myOrders">My orders</label>
                    </div>
                    <button className={css_button.btn_open} onClick={handleShow}>Actions</button>
                </div>
        </div>
    );
};

export {
    InputBlock
};
