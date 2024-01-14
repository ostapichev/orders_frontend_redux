import { FC, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';

import { IFuncVoid, ISortingReverse } from "../../types";
import { IParams } from "../../interfaces";
import { Order } from "../Order/Order";
import { orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './Orders.module.css';


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        nameInputData,
        surNameInputData,
        emailInputData,
        phoneInputData,
        ageInputData,
        courseInputData,
        formatCourseInputData,
        typeCourseInputData,
        statusInputData,
        groupInputData,
        startDateInputData,
        endDateInputData,
        orders,
        trigger,
        sorted,
        checkbox,
        pageOrders,
        showParams,
        orderBy,
    } = useAppSelector(state => state.orderReducer);
    const { triggerComment } = useAppSelector(state => state.commentReducer);
    const { me } = useAppSelector(state => state.authReducer);
    const [query] = useSearchParams();
    const getAllOrders = useCallback(() => {
        const params: IParams = {};
        params.page = query.get('page');
        params.order_by = query.get('order_by');
        params.name_contains = query.get('name');
        params.surname_contains = query.get('surname');
        params.email_contains = query.get('email');
        params.phone_contains = query.get('phone');
        params.age_in = query.get('age');
        params.course = query.get('course');
        params.course_format = query.get('course_format');
        params.course_type = query.get('course_type');
        params.status_in = query.get('status');
        params.group = query.get('group');
        params.created_at_after = query.get('start_date');
        params.created_at_before = query.get('end_date');
        params.manager = query.get('manager');
        dispatch(orderActions.getAll({ params }));
        dispatch(orderActions.getExelFile({ params }));
    },[dispatch, query]);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        const newOrderBy = sorted ? order_by : `-${order_by}`;
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
    const updateQueryString = useCallback(() => {
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
        <div className={ css.table }>
            <div>
                <ListGroup className={ css.table_data } horizontal>
                    <ListGroup.Item className={ css.table_header } onClick={ orderById }>id</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByName }>name</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderBySurName }>surname</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByEmail }>email</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByPhone }>phone</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByAge }>age</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByCourse }>course</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByCourseFormat }>
                        course_format
                    </ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByCourseType }>
                        course_type
                    </ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByStatus }>status</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderBySum }>sum</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByPaid }>paid</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByGroup }>group</ListGroup.Item>
                    <ListGroup.Item className={ css.table_header } onClick={ orderByCreated }>
                        created at
                    </ListGroup.Item>
                    <ListGroup.Item className={css.table_header} onClick={ orderByManager }>manager</ListGroup.Item>
                </ListGroup>
            </div>
            <div className='min-vw-100'>
                { orders.map(order => <Order key={ order.id } order={ order } />) }
            </div>
        </div>
    );
};

export {
    Orders
};
