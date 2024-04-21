import {FC, useState, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import {IFuncVoid, ISortingReverse} from "../../types";
import {IParams} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, orderTrigger, paramsOrders, sorted, checkbox} = useAppSelector(state => state.orderReducer);
    const {commentTrigger} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [orderId, setOrderId] = useState<number>(null);
    const [query, setQuery] = useSearchParams();
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page') || '1',
            order_by: query.get('order_by'),
            name: query.get('name'),
            surname: query.get('surname'),
            email: query.get('email'),
            phone: query.get('phone'),
            age: query.get('age'),
            course: query.get('course'),
            course_format: query.get('course_format'),
            course_type: query.get('course_type'),
            status: query.get('status'),
            group: query.get('group'),
            created_at_after: query.get('created_at_after'),
            created_at_before: query.get('created_at_before'),
            manager: paramsOrders.manager
        }, 1000);
    const debouncedParamsString: string = JSON.stringify(debouncedParams);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? order_by : `-${order_by}`;
        dispatch(orderActions.setOrderByParams(newOrderBy));
        dispatch(orderActions.setPage('1'));
    };
    const orderById: IFuncVoid = () => sortingOrderBy('id');
    const orderByName: IFuncVoid = () => sortingOrderBy('name');
    const orderBySurName: IFuncVoid = () => sortingOrderBy('surname');
    const orderByEmail: IFuncVoid = () => sortingOrderBy('email');
    const orderByPhone: IFuncVoid = () => sortingOrderBy('phone');
    const orderByAge: IFuncVoid = () => sortingOrderBy('age');
    const orderByCourse: IFuncVoid = () => sortingOrderBy('course');
    const orderByCourseFormat: IFuncVoid = () => sortingOrderBy('course_format');
    const orderByCourseType: IFuncVoid = () => sortingOrderBy('course_type');
    const orderByStatus: IFuncVoid = () => sortingOrderBy('status');
    const orderBySum: IFuncVoid = () => sortingOrderBy('sum');
    const orderByPaid: IFuncVoid = () => sortingOrderBy('already_paid');
    const orderByGroup: IFuncVoid = () => sortingOrderBy('group');
    const orderByCreated: IFuncVoid = () => sortingOrderBy('created_at');
    const orderByManager: IFuncVoid = () => sortingOrderBy('manager');
    useEffect(() => {
        const queryString: string[] = [];
        if (+paramsOrders.page > 1) {
            queryString.push(`page=${encodeURIComponent(paramsOrders.page)}`);
        }
        if (paramsOrders.order_by) {
            queryString.push(`order_by=${encodeURIComponent(paramsOrders.order_by)}`);
        }
        if (paramsOrders.name) {
            queryString.push(`name=${encodeURIComponent(paramsOrders.name)}`);
        }
        if (paramsOrders.surname) {
            queryString.push(`surname=${encodeURIComponent(paramsOrders.surname)}`);
        }
        if (paramsOrders.email) {
            queryString.push(`email=${encodeURIComponent(paramsOrders.email)}`);
        }
        if (paramsOrders.phone) {
            queryString.push(`phone=${encodeURIComponent(paramsOrders.phone)}`);
        }
        if (paramsOrders.age) {
            queryString.push(`age=${encodeURIComponent(paramsOrders.age)}`);
        }
        if (paramsOrders.course) {
            queryString.push(`course=${encodeURIComponent(paramsOrders.course)}`);
        }
        if (paramsOrders.course_format) {
            queryString.push(`course_format=${encodeURIComponent(paramsOrders.course_format)}`);
        }
        if (paramsOrders.course_type) {
            queryString.push(`course_type=${encodeURIComponent(paramsOrders.course_type)}`);
        }
        if (paramsOrders.status) {
            queryString.push(`status=${encodeURIComponent(paramsOrders.status)}`);
        }
        if (paramsOrders.group) {
            queryString.push(`group=${encodeURIComponent(paramsOrders.group)}`);
        }
        if (paramsOrders.created_at_after) {
            queryString.push(`created_at_after=${encodeURIComponent(paramsOrders.created_at_after)}`);
        }
        if (paramsOrders.created_at_before) {
            queryString.push(`created_at_before=${encodeURIComponent(paramsOrders.created_at_before)}`);
        }
        if (checkbox) {
            queryString.push(`manager=${encodeURIComponent(me.profile.name)}`);
        }
        setQuery(`?${queryString.join('&')}`);
    }, [setQuery, checkbox, me?.profile?.name, paramsOrders]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, orderTrigger, commentTrigger, debouncedParamsString]);

    return (
        <div className={css.table}>
            <ListGroup className={css.table_data} horizontal>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderById}
                >
                    id
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByName}
                >
                    name
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderBySurName}
                >
                    surname
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByEmail}
                >
                    email
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByPhone}
                >
                    phone
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByAge}
                >
                    age
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByCourse}
                >
                    course
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByCourseFormat}
                >
                    course_format
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByCourseType}
                >
                    course_type
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByStatus}
                >
                    status
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderBySum}
                >
                    sum
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByPaid}
                >
                    paid
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByGroup}
                >
                    group
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByCreated}
                >
                    created at
                </ListGroup.Item>
                <ListGroup.Item
                    className={css.table_header}
                    onClick={orderByManager}
                >
                    manager
                </ListGroup.Item>
            </ListGroup>
            {
                orders.map(order => <Order
                    key={order.id}
                    order={order}
                    isOpen={order.id === orderId}
                    onClick={() => (order.id === orderId ? setOrderId(null) : setOrderId(order.id))}
                />)
            }
        </div>
    );
};

export {
    Orders
};
