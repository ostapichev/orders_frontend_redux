import React, {FC, useCallback, useEffect, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import {GetExelFile} from "../GetExelFile/GetExelFile";
import {IOrderBy, ISortingReverse} from "../../types";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, trigger, sorted, checkbox} = useAppSelector(state => state.orderReducer);
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
        <div>
            <div>
                <label htmlFor="myOrders">
                    <input type="checkbox" name="myOrders" checked={checkbox} onChange={handler}/>
                    My orders
                </label>
                <GetExelFile/>
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
            <hr/>
            {
                orders.map(order => <Order key={order.id} order={order}/>)
            }
        </div>
    );
};

export {
    Orders
};
