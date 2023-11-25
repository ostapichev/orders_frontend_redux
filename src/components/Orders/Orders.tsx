import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {ButtonOpenForm} from "../ButtonOpenForm/ButtonOpenForm";
import {GetExelFile} from "../GetExelFile/GetExelFile";
import {Group} from "../Group/Group";
import {IOrderBy, ISortingReverse} from "../../types";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';
import css_button from '../ButtonOpenForm/ButtonOpenForm.module.css';

import okten_logo from '../../asserts/images/okten_loading1.png';


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {orders, trigger, sorted, checkbox} = useAppSelector(state => state.orderReducer);
    const {groups} = useAppSelector(state => state.groupReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const getAllOrders = useCallback((sorting: string, manager='') => {
        dispatch(orderActions.getAll({ page: query.get('page'), order_by: sorting, manager}));
        },[dispatch, query]);
    const getMyOrders = useCallback((sorting: string, manager: string) => {
        dispatch(orderActions.getAll({ page: query.get('page'), order_by: sorting, manager}));
    },[dispatch, query]);
    const sortingReverse: ISortingReverse = (orderBy: string) => {
        sorted ? getAllOrders(orderBy) : getAllOrders(`-${orderBy}`);
        dispatch(orderActions.setOrderBy());
    };
    const sortingOrders: IOrderBy = () => {
        checkbox ? getMyOrders('-id', me.profile.name) : getAllOrders('-id');
        dispatch(orderActions.setCheckBox());
    };
    const orderById: IOrderBy = () => sortingReverse('id');
    const orderByName: IOrderBy = () => sortingReverse('name');
    const orderBySurName: IOrderBy = () => sortingReverse('surname');
    const orderByEmail: IOrderBy = () => sortingReverse('email');
    const orderByPhone: IOrderBy = () => sortingReverse('phone');
    const orderByAge: IOrderBy = () => sortingReverse('age');
    const orderByCourse: IOrderBy = () => sortingReverse('course');
    const orderByCourseFormat: IOrderBy = () => sortingReverse('course_format');
    const orderByCourseType: IOrderBy = () => sortingReverse('course_type');
    const orderByStatus: IOrderBy = () => sortingReverse('status');
    const orderBySum: IOrderBy = () => sortingReverse('sum');
    const orderAlReadyPaid: IOrderBy = () => sortingReverse('already_paid');
    const orderByGroup: IOrderBy = () => sortingReverse('group');
    const orderByCreated: IOrderBy = () => sortingReverse('created_at');
    const orderByManager: IOrderBy = () => sortingReverse('manager');
    const handler: IOrderBy = () => sortingOrders();
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect( () => {
        checkbox ? getMyOrders('-id', me.profile.name) : getAllOrders('-id', '');
        }, [dispatch, getAllOrders, trigger, triggerComment, me, checkbox, getMyOrders]);

    return (
        <div className={css.orders}>
            <Offcanvas className={css.container_actions} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={css.actions_header}>Actions</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={css.body_actions}>
                    <div className={css.buttons_block} onClick={handleClose}>
                        <ButtonOpenForm buttonName={'Create group'} func={'OpenGroupForm'}/>
                        <ButtonOpenForm buttonName={'Create order'} func={'OpenOrderForm'}/>
                        <GetExelFile/>
                    </div>
                    <img className={css.okten_logo} src={okten_logo} alt="okten"/>
                </Offcanvas.Body>
            </Offcanvas>
            <div className={css.block_filters}>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="text" placeholder="Name"/>
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
                <div className={css.filter_order_check}>
                    <Form.Check aria-label="My_orders" name="myOrders" inline checked={checkbox} onChange={handler}/>
                    <label className={css.my} htmlFor="myOrders">My orders</label>
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
                    <Form.Select size="sm" name="group" aria-label=">Choose group"
                                 onChange={(event) => dispatch(orderActions.setOrderCreate(event.target.value))}>
                            {groups.map(group => <Group key={group.id} group={group}/>)}
                    </Form.Select>
                    <Form.Control size="sm" type="datetime-local" placeholder="start date"/>
                    <Form.Control size="sm" type="datetime-local" placeholder="end date"/>
                </div>
                <button className={css_button.btn_open} onClick={handleShow}>Actions</button>
            </div>
            <ListGroup className={css.list_buttons} horizontal>
                <ListGroup.Item onClick={orderById}>id</ListGroup.Item>
                <ListGroup.Item onClick={orderByName}>name</ListGroup.Item>
                <ListGroup.Item onClick={orderBySurName}>surname</ListGroup.Item>
                <ListGroup.Item onClick={orderByEmail}>email</ListGroup.Item>
                <ListGroup.Item onClick={orderByAge}>phone</ListGroup.Item>
                <ListGroup.Item onClick={orderByCourse}>age</ListGroup.Item>
                <ListGroup.Item onClick={orderByCourseFormat}>course</ListGroup.Item>
                <ListGroup.Item onClick={orderByCourseType}>course type</ListGroup.Item>
                <ListGroup.Item onClick={orderByStatus}>status</ListGroup.Item>
                <ListGroup.Item onClick={orderBySum}>sum</ListGroup.Item>
                <ListGroup.Item onClick={orderAlReadyPaid}>already paid</ListGroup.Item>
                <ListGroup.Item onClick={orderByGroup}>group</ListGroup.Item>
                <ListGroup.Item onClick={orderByCreated}>created at</ListGroup.Item>
                <ListGroup.Item onClick={orderByManager}>manager</ListGroup.Item>
            </ListGroup>
            <div className={css.order_detail}>
                {orders.map(order => <Order key={order.id} order={order}/>)}
            </div>
        </div>
    );
};

export {
    Orders
};
