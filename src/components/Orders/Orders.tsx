import {FC, useEffect} from 'react';
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
    const {orders, trigger, sorted, checkbox, params, showQuery} = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const [debouncedValueName] = useDebounce<string>(params.name, 1000);
    const [debouncedValueSurname] = useDebounce<string>(params.surname, 1000);
    const [debouncedValueEmail] = useDebounce<string>(params.email, 1000);
    const [debouncedValuePhone] = useDebounce<string>(params.phone, 1000);
    const [debouncedValueAge] = useDebounce<string>(params.age, 1000);
    const [debouncedValueCourse] = useDebounce<string>(params.course, 1000);
    const [debouncedValueFormatCourse] = useDebounce<string>(params.course_format, 1000);
    const [debouncedValueTypeCourse] = useDebounce<string>(params.course_type, 1000);
    const [debouncedValueStatus] = useDebounce<string>(params.status, 1000);
    const [debouncedValueGroup] = useDebounce<string>(params.group, 1000);
    const [debouncedValueStartDate] = useDebounce<string>(params.created_at_after, 1000);
    const [debouncedValueEndDate] = useDebounce<string>(params.created_at_before, 1000);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? `-${order_by}` : order_by;
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
    useEffect( () => {
        const params: IParams = {};
        query.forEach((value, key) => {
            params[key] = value;
        });
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, trigger, triggerComment, query]);
    useEffect(() => {
        const queryParams: string[] = [];
        if (showQuery || query.get('page')) {
            queryParams.push(`page=${encodeURIComponent(params.page || query.get('page'))}`);
        }
        if (debouncedValueName || query.get('name')) {
            queryParams.push(`name=${encodeURIComponent(debouncedValueName || query.get('name'))}`);
        }
        if (debouncedValueSurname || query.get('surname')) {
            queryParams.push(`surname=${encodeURIComponent(debouncedValueSurname || query.get('surname'))}`);
        }
        if (debouncedValueEmail || query.get('email')) {
            queryParams.push(`email=${encodeURIComponent(debouncedValueEmail || query.get('email'))}`);
        }
        if (debouncedValuePhone || query.get('phone')) {
            queryParams.push(`phone=${encodeURIComponent(debouncedValuePhone || query.get('phone'))}`);
        }
        if (debouncedValueAge || query.get('age')) {
            queryParams.push(`age=${encodeURIComponent(debouncedValueAge) || query.get('age')}`);
        }
        if (debouncedValueCourse || query.get('course')) {
            queryParams.push(`course=${encodeURIComponent(debouncedValueCourse) || query.get('course')}`);
        }
        if (debouncedValueFormatCourse || query.get('course_format')) {
            queryParams.push(`course_format=${encodeURIComponent(
                debouncedValueFormatCourse || query.get('course_format'))}`
            );
        }
        if (debouncedValueTypeCourse || query.get('course_type')) {
            queryParams.push(`course_type=${encodeURIComponent(debouncedValueTypeCourse) || query.get('course_type')}`);
        }
        if (debouncedValueStatus || query.get('status')) {
            queryParams.push(`status=${encodeURIComponent(debouncedValueStatus) || query.get('status')}`);
        }
        if (debouncedValueGroup || query.get('group')) {
            queryParams.push(`group=${encodeURIComponent(debouncedValueGroup) || query.get('group')}`);
        }
        if (debouncedValueStartDate || query.get('created_at_after')) {
            queryParams.push(`created_at_after=${encodeURIComponent(
                debouncedValueStartDate) || query.get('created_at_after')}`
            );
        }
        if (debouncedValueEndDate || query.get('created_at_before')) {
            queryParams.push(`created_at_before=${encodeURIComponent(
                debouncedValueEndDate) || query.get('created_at_before')}`
            );
        }
        if (params.order_by || query.get('order_by')) {
            queryParams.push(`order_by=${encodeURIComponent(params.order_by || query.get('order_by'))}`);
        }
        if (checkbox || query.get('manager')) {
            queryParams.push(`manager=${encodeURIComponent(me.profile.name) || query.get('manager')}`);
        }
        const queryString: string = queryParams.join('&');
        setQuery(queryString && `?${queryString}`);
    }, [debouncedValueName, debouncedValueSurname, debouncedValueEmail, debouncedValuePhone, debouncedValueAge,
        debouncedValueCourse, debouncedValueFormatCourse, debouncedValueTypeCourse, debouncedValueStatus, debouncedValueGroup,
        debouncedValueStartDate, debouncedValueEndDate, checkbox, me?.profile.name, query, params, showQuery,
        setQuery, dispatch]);

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
