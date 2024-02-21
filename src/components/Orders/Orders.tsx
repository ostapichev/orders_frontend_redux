import {FC, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useLocation, useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import {IFuncVoid, ISortingReverse} from "../../types";
import {IParams} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {
        nameInputData, surNameInputData, emailInputData, phoneInputData, ageInputData, courseInputData,
        formatCourseInputData, typeCourseInputData, statusInputData, groupInputData, startDateInputData,
        endDateInputData, orders, trigger, sorted, checkbox, pageOrders, showParams, orderBy
    } = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const [debouncedValueName] = useDebounce<string>(nameInputData, 1000);
    const [debouncedValueSurname] = useDebounce<string>(surNameInputData, 1000);
    const [debouncedValueEmail] = useDebounce<string>(emailInputData, 1000);
    const [debouncedValuePhone] = useDebounce<string>(phoneInputData, 1000);
    const [debouncedValueAge] = useDebounce<string>(ageInputData, 1000);
    const [debouncedValueCourse] = useDebounce<string>(courseInputData, 1000);
    const [debouncedValueFormatCourse] = useDebounce<string>(formatCourseInputData, 1000);
    const [debouncedValueTypeCourse] = useDebounce<string>(typeCourseInputData, 1000);
    const [debouncedValueStatus] = useDebounce<string>(statusInputData, 1000);
    const [debouncedValueGroup] = useDebounce<string>(groupInputData, 1000);
    const [debouncedValueStartDate] = useDebounce<string>(startDateInputData, 1000);
    const [debouncedValueEndDate] = useDebounce<string>(endDateInputData, 1000);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? order_by : `-${order_by}`;
        setParams(newOrderBy);
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
    const setParams = (param: string) => {
        const queryParams: string[] = [];
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(pageOrders)}`);
        }
        if (debouncedValueName) {
            queryParams.push(`name=${encodeURIComponent(debouncedValueName)}`);
        }
        if (debouncedValueSurname) {
            queryParams.push(`surname=${encodeURIComponent(debouncedValueSurname)}`);
        }
        if (debouncedValueEmail) {
            queryParams.push(`email=${encodeURIComponent(debouncedValueEmail)}`);
        }
        if (debouncedValuePhone) {
            queryParams.push(`phone=${encodeURIComponent(debouncedValuePhone)}`);
        }
        if (debouncedValueAge) {
            queryParams.push(`age=${encodeURIComponent(debouncedValueAge)}`);
        }
        if (debouncedValueCourse) {
            queryParams.push(`course=${encodeURIComponent(debouncedValueCourse)}`);
        }
        if (debouncedValueFormatCourse) {
            queryParams.push(`course_format=${encodeURIComponent(debouncedValueFormatCourse)}`);
        }
        if (debouncedValueTypeCourse) {
            queryParams.push(`course_type=${encodeURIComponent(debouncedValueTypeCourse)}`);
        }
        if (debouncedValueStatus) {
            queryParams.push(`status=${encodeURIComponent(debouncedValueStatus)}`);
        }
        if (debouncedValueGroup) {
            queryParams.push(`group=${encodeURIComponent(debouncedValueGroup)}`);
        }
        if (debouncedValueStartDate) {
            queryParams.push(`created_at_after=${encodeURIComponent(debouncedValueStartDate)}`);
        }
        if (debouncedValueEndDate) {
            queryParams.push(`created_at_before=${encodeURIComponent(debouncedValueEndDate)}`);
        }
        if (param && param !== '') {
            queryParams.push(`order_by=${encodeURIComponent(param)}`);
            dispatch(orderActions.setOrderByParams(param));
        }
        if (checkbox) {
            queryParams.push(`manager=${encodeURIComponent(me.profile.name)}`);
        }
        const queryString: string = queryParams.join('&');
        setQuery(queryString && `?${queryString}`);
    };
    useEffect( () => {
        const searchParams: URLSearchParams = new URLSearchParams(location.search);
        const params: IParams = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, trigger, triggerComment, query, location.search]);

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
