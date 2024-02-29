import {FC, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import {headerTable} from "../../constants";
import {IFuncVoid, ISortingReverse} from "../../types";
import {IParams} from "../../interfaces";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {
        orders, trigger, sorted, checkbox, params, showQuery
    } = useAppSelector(state => state.orderReducer);
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
    useEffect(() => {
        if (showQuery) {
            const newParams: IParams = {...params};
            Object.keys(newParams).forEach((key) => {
                if (!newParams[key]) {
                    delete newParams[key];
                }
            });
            setQuery(newParams);
        } else {
            if (headerTable.includes(query.get('order_by'))) {
                dispatch(orderActions.setSorted(query.get('order_by')));
            }
            if (query.get('page')) {
                dispatch(orderActions.setPage(query.get('page')));
            }
            if (query.get('name')) {
                dispatch(orderActions.setNameInputData(query.get('name')));
            }
            if (query.get('surname')) {
                dispatch(orderActions.setSurNameInputData(query.get('surname')));
            }
            if (query.get('email')) {
                dispatch(orderActions.setEmailInputData(query.get('email')));
            }
            if (query.get('phone')) {
                dispatch(orderActions.setPhoneInputData(query.get('phone')));
            }
            if (query.get('age')) {
                dispatch(orderActions.setAgeInputData(query.get('age')));
            }
            if (query.get('course')) {
                dispatch(orderActions.setCourseInputData(query.get('course')));
            }
            if (query.get('course_type')) {
                dispatch(orderActions.setTypeInputData(query.get('course_type')));
            }
            if (query.get('course_format')) {
                dispatch(orderActions.setFormatInputData(query.get('course_format')));
            }
            if (query.get('status')) {
                dispatch(orderActions.setStatusInputData(query.get('status')));
            }
            if (query.get('groups')) {
                dispatch(orderActions.setGroupInputData(query.get('groups')));
            }
            if (query.get('created_at_after')) {
                dispatch(orderActions.setStartDateInputData(query.get('created_at_after')));
            }
            if (query.get('created_at_before')) {
                dispatch(orderActions.setEndDateInputData(query.get('created_at_before')));
            }
            if (query.get('manager')) {
                dispatch(orderActions.setReloadBox(query.get('manager')));
            }
        }
    }, [
        debouncedValueName, debouncedValueSurname, debouncedValueEmail, debouncedValuePhone,
        debouncedValueAge, debouncedValueCourse, debouncedValueFormatCourse, debouncedValueTypeCourse,
        debouncedValueStatus, debouncedValueGroup, debouncedValueStartDate, debouncedValueEndDate,
        me?.profile.name, checkbox, query, setQuery, params, showQuery, dispatch
    ]);
    useEffect( () => {
        const params: IParams = {};
        query.forEach((value, key) => {
            params[key] = value;
        });
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, trigger, triggerComment, query]);

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
