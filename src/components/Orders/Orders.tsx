import {FC, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import {IFuncVoid, ISortingReverse} from "../../types";
import {IParams} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions, paramsActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {orders, trigger} = useAppSelector(state => state.orderReducer);
    const {
        sorted, checkbox, order_by, pageOrders, name, surname, email, phone, age, course, course_format, course_type,
        status, showParams, group, created_at_after, created_at_before
    } = useAppSelector(state => state.paramsReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const [debouncedValueName] = useDebounce<string>(name, 1000);
    const [debouncedValueSurname] = useDebounce<string>(surname, 1000);
    const [debouncedValueEmail] = useDebounce<string>(email, 1000);
    const [debouncedValuePhone] = useDebounce<string>(phone, 1000);
    const [debouncedValueAge] = useDebounce<string>(age, 1000);
    const [debouncedValueCourse] = useDebounce<string>(course, 1000);
    const [debouncedValueFormatCourse] = useDebounce<string>(course_format, 1000);
    const [debouncedValueTypeCourse] = useDebounce<string>(course_type, 1000);
    const [debouncedValueStatus] = useDebounce<string>(status, 1000);
    const [debouncedValueGroup] = useDebounce<string>(group, 1000);
    const [debouncedValueStartDate] = useDebounce<string>(created_at_after, 1000);
    const [debouncedValueEndDate] = useDebounce<string>(created_at_before, 1000);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? order_by : `-${order_by}`;
        dispatch(paramsActions.setOrderByParams(newOrderBy));
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
    useEffect( () => {
        const searchParams: URLSearchParams = new URLSearchParams(location.search);
        console.log(searchParams);
        const params: IParams = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        dispatch(paramsActions.setOrderBy(query.get('order_by')));
        dispatch(paramsActions.setNameContains(query.get('name')));
        dispatch(paramsActions.setSurnameContains(query.get('surname')));
        dispatch(paramsActions.setEmailContains(query.get('email')));
        dispatch(paramsActions.setPhoneContains(query.get('phone')));
        dispatch(paramsActions.setAgeIn(query.get('age')));
        dispatch(paramsActions.setCourse(query.get('course')));
        dispatch(paramsActions.setCourseFormat(query.get('course_format')));
        dispatch(paramsActions.setCourseType(query.get('course_type')));
        dispatch(paramsActions.setStatusIn(query.get('status')));
        dispatch(paramsActions.setGroup(query.get('group')));
        dispatch(paramsActions.setCreatedAtAfter(query.get('created_at_after')));
        dispatch(paramsActions.setCreatedAtBefore(query.get('created_at_before')));
        dispatch(paramsActions.setManager(query.get('manager')));
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, query, trigger, triggerComment, location.search]);
    useEffect(() => {
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
        if (order_by && order_by !== '') {
            queryParams.push(`order_by=${encodeURIComponent(order_by)}`);
        }
        if (checkbox) {
            queryParams.push(`manager=${encodeURIComponent(me.profile.name)}`);
        }
        const queryString: string = queryParams.join('&');
        navigate(queryString && `?${queryString}`);
    }, [debouncedValueName, debouncedValueSurname, debouncedValueEmail, debouncedValuePhone, debouncedValueAge,
        debouncedValueCourse, debouncedValueFormatCourse, debouncedValueTypeCourse, debouncedValueStatus, debouncedValueGroup,
        debouncedValueStartDate, debouncedValueEndDate, checkbox, order_by, pageOrders, showParams, me?.profile.name,
        setQuery, navigate, dispatch]);

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
