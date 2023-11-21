import React, {FC, useCallback, useEffect, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import Form from 'react-bootstrap/Form';

import {IOrderBy, ISortingReverse} from "../../types";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';
import {Group} from "../Group/Group";


const Orders: FC = () => {
    const dispatch = useAppDispatch();
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
            <div className={css.block_filters}>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="text" placeholder="Name"/>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="text" placeholder="Surname"/>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="email" placeholder="email"/>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="text" placeholder="phone"/>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm" type="number" placeholder="age"/>
                </div>
                <div className={css.filter_order}>
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
                </div>
                <div className={css.filter_order}>
                    <Form.Select size="sm" aria-label="Course_type" name="course_type">
                        <option>all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </Form.Select>
                </div>
                <div className={css.filter_order}>
                    <Form.Select size="sm" aria-label="Status" name="status">
                        <option>all statuses</option>
                        <option value="new_order">new_order</option>
                        <option value="in_work">in_work</option>
                        <option value="agree">agree</option>
                        <option value="disagree">disagree</option>
                        <option value="dubbing">dubbing</option>
                    </Form.Select>
                </div>
                <div className={css.filter_order}>
                    <Form.Select size="sm" aria-label=">Choose group" name="group"
                                 onChange={(event) => dispatch(orderActions.setOrderCreate(event.target.value))}>
                        <option>all groups</option>
                        {
                            groups.map(group => <Group key={group.id} group={group}/>)
                        }
                    </Form.Select>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm"  type="datetime-local" placeholder="start date"/>
                </div>
                <div className={css.filter_order}>
                    <Form.Control size="sm"  type="datetime-local" placeholder="end date"/>
                </div>
                <div className={css.filter_order}>
                    <label htmlFor="myOrders">My orders
                        <Form.Check aria-label="My_orders" name="myOrders" checked={checkbox} onChange={handler}/>
                    </label>
                </div>

            </div>
            <div>
                <button onClick={orderById}>id</button>
                <button onClick={orderByName}>name</button>
                <button onClick={orderBySurName}>surname</button>
                <button onClick={orderByEmail}>email</button>
                <button onClick={orderByPhone}>phone</button>
                <button onClick={orderByAge}>age</button>
                <button onClick={orderByCourse}>course</button>
                <button onClick={orderByCourseFormat}>course format</button>
                <button onClick={orderByCourseType}>course type</button>
                <button onClick={orderByStatus}>status</button>
                <button onClick={orderBySum}>sum</button>
                <button onClick={orderAlReadyPaid}>already paid</button>
                <button onClick={orderByGroup}>group</button>
                <button onClick={orderByCreated}>created at</button>
                <button onClick={orderByManager}>manager</button>
            </div>
            {
                orders.map(order => <Order key={order.id} order={order}/>)
            }
        </div>
    );
};

export {
    Orders
};
