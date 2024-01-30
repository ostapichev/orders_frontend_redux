import {FC, useCallback, useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import {IFuncVoid, ISortingReverse} from "../../types";
import {IParams} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        nameInputData, surNameInputData, emailInputData, phoneInputData, ageInputData, courseInputData,
        formatCourseInputData, typeCourseInputData, statusInputData, groupInputData, startDateInputData,
        endDateInputData, orders, trigger, sorted, checkbox, pageOrders, showParams, orderBy
    } = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query] = useSearchParams();
    const getAllOrders: IFuncVoid = useCallback(() => {
        const page = query.get('page');
        const order_by: string = query.get('order_by');
        const name_contains: string = query.get('name');
        const surname_contains: string = query.get('surname');
        const email_contains: string = query.get('email');
        const phone_contains: string = query.get('phone');
        const age_in: string = query.get('age');
        const course: string = query.get('course');
        const course_format: string = query.get('course_format');
        const course_type: string = query.get('course_type');
        const status_in: string = query.get('status');
        const group: string = query.get('group');
        const created_at_after: string = query.get('start_date');
        const created_at_before: string = query.get('end_date');
        const manager: string = query.get('manager');
        const params: IParams = {
            page, order_by, name_contains, surname_contains, email_contains, phone_contains, age_in,
            course, course_format, course_type, status_in, group, created_at_after, created_at_before, manager
        };
        dispatch(orderActions.getAll({ params }));
    },[dispatch, query]);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? order_by : `-${ order_by }`;
        dispatch(orderActions.setOrderByParams(newOrderBy));
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
    const updateQueryString: IFuncVoid = useCallback(() => {
        const queryParams: string[] = [];
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(pageOrders)}`);
        }
        if (nameInputData) {
            queryParams.push(`name=${encodeURIComponent(nameInputData)}`);
        }
        if (surNameInputData) {
            queryParams.push(`surname=${encodeURIComponent(surNameInputData)}`);
        }
        if (emailInputData) {
            queryParams.push(`email=${encodeURIComponent(emailInputData)}`);
        }
        if (phoneInputData) {
            queryParams.push(`phone=${encodeURIComponent(phoneInputData)}`);
        }
        if (ageInputData) {
            queryParams.push(`age=${encodeURIComponent(ageInputData)}`);
        }
        if (courseInputData) {
            queryParams.push(`course=${encodeURIComponent(courseInputData)}`);
        }
        if (formatCourseInputData) {
            queryParams.push(`course_format=${encodeURIComponent(formatCourseInputData)}`);
        }
        if (typeCourseInputData) {
            queryParams.push(`course_type=${encodeURIComponent(typeCourseInputData)}`);
        }
        if (statusInputData) {
            queryParams.push(`status=${encodeURIComponent(statusInputData)}`);
        }
        if (groupInputData) {
            queryParams.push(`group=${encodeURIComponent(groupInputData)}`);
        }
        if (startDateInputData) {
            queryParams.push(`start_date=${encodeURIComponent(startDateInputData)}`);
        }
        if (endDateInputData) {
            queryParams.push(`end_date=${encodeURIComponent(endDateInputData)}`);
        }
        if (orderBy && orderBy !== '') {
            queryParams.push(`order_by=${encodeURIComponent(orderBy)}`);
        }
        if (checkbox) {
            queryParams.push(`manager=${encodeURIComponent(me.profile.name)}`);
        }
        const queryString: string = queryParams.join('&');
        navigate(queryString && `?${queryString}`);
    }, [nameInputData, surNameInputData, emailInputData, phoneInputData, ageInputData, courseInputData,
        formatCourseInputData, typeCourseInputData, statusInputData, groupInputData, startDateInputData,
        endDateInputData, me.profile.name, checkbox, navigate, orderBy, pageOrders, showParams]);
    useEffect(() => {
        updateQueryString();
    }, [nameInputData, surNameInputData, emailInputData, phoneInputData, ageInputData, courseInputData,
        formatCourseInputData, typeCourseInputData, statusInputData, groupInputData, startDateInputData,
        endDateInputData, navigate, checkbox, updateQueryString]);
    useEffect( () => {
        getAllOrders();
    }, [dispatch, trigger, getAllOrders, triggerComment, me.profile.name]);

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
            <div>
                {
                    orders.map(order => <Order
                        key={order.id}
                        order={order}
                    />)
                }
            </div>
        </div>
    );
};

export {
    Orders
};
