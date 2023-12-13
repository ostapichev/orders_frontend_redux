import {FC, useCallback, useEffect, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {ButtonOpenForm} from "../ButtonOpenForm/ButtonOpenForm";
import {GetExelFile} from "../GetExelFile/GetExelFile";
import {IOrderBy, ISortingReverse} from "../../types";
import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Orders.module.css';

import {okten_logo} from '../../asserts';
import {IParams} from "../../interfaces";


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, trigger, sorted, checkbox, nameInputData, surNameInputData, emailInputData, phoneInputData,
        ageInputData, courseInputData, formatCourseInputData, typeCourseInputData, statusInputData, groupInputData,
        startDateInputData, endDateInputData, openModal} = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const getAllOrders = useCallback((
        sorting: string,
        manager: string,
        searchName: string,
        searchSurname: string,
        searchEmail: string,
        searchPhone: string,
        searchAge: string,
        searchCourse: string,
        searchFormatCourse: string,
        searchTypeCourse: string,
        searchStatus: string,
        searchGroup: string,
        searchStartDate: string,
        searchEndDate: string) => {
        const params = {
            page: query.get('page'),
            order_by: sorting,
            name_contains: searchName,
            surname_contains: searchSurname,
            email_contains: searchEmail,
            phone_contains: searchPhone,
            age_in: searchAge,
            course: searchCourse,
            course_format: searchFormatCourse,
            course_type: searchTypeCourse,
            status_in: searchStatus,
            group: searchGroup,
            created_at_after: searchStartDate,
            created_at_before: searchEndDate,
            manager
        };
        const filteredParams: IParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== '')
        );
        dispatch(orderActions.getAll({params: filteredParams}));
        },[dispatch, query]);
    const handleClose: IOrderBy = () => {
        dispatch(orderActions.setShowModal(false));
    };
    const sortingCheckBox: ISortingReverse = (orderBy: string) => {
        getAllOrders(
            orderBy,
            checkbox ? me.profile.name : '',
            searchName,
            searchSurname,
            searchEmail,
            searchPhone,
            searchAge,
            searchCourse,
            searchFormatCourse,
            searchTypeCourse,
            searchStatus,
            startDateInputData,
            endDateInputData,
            searchGroup);
    };
    const sortingReverse: ISortingReverse = (orderBy: string) => {
        sorted ? sortingCheckBox(orderBy) : sortingCheckBox(`-${orderBy}`);
        dispatch(orderActions.setOrderBy());
    };
    const orderById: IOrderBy = () => {
        sorted ? setQueryRef.current(prev => ({ ...prev, order_by: 'id' })) : setQueryRef.current(prev => ({ ...prev, order_by: '-id' }));
        sortingReverse('id');
    }
    const orderByName: IOrderBy = () => {
        sorted ? setQueryRef.current(prev => ({ ...prev, name: 'name' })) : setQueryRef.current(prev => ({ ...prev, name: '-name' }));
        sortingReverse('name');
    }
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
    const searchName = nameInputData || '';
    const searchSurname = surNameInputData || '';
    const searchEmail = emailInputData || '';
    const searchPhone = phoneInputData || '';
    const searchAge = ageInputData || '';
    const searchCourse = courseInputData || '';
    const searchFormatCourse = formatCourseInputData || '';
    const searchTypeCourse = typeCourseInputData || '';
    const searchStatus = statusInputData || '';
    const searchGroup = groupInputData || '';
    const searchStartDate = startDateInputData || '';
    const searchEndDate = endDateInputData ||'';
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect( () => {
        getAllOrders(
            '-id',
            checkbox ? me.profile.name : '',
            searchName,
            searchSurname,
            searchEmail,
            searchPhone,
            searchAge,
            searchCourse,
            searchFormatCourse,
            searchTypeCourse,
            searchStatus,
            searchGroup,
            searchStartDate,
            searchEndDate)
        }, [dispatch, trigger, getAllOrders, triggerComment, searchName, searchSurname, searchEmail, searchPhone,
                    searchAge, searchCourse, searchFormatCourse, searchTypeCourse, searchStatus, searchGroup,
                    searchStartDate, searchEndDate, me.profile.name, checkbox]);

    return (
        <div className={css.orders}>
            <Offcanvas className={css.container_actions} show={openModal} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={css.actions_header}>Actions</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={css.body_actions}>
                    <div className={css.buttons_block} onClick={handleClose}>
                        <ButtonOpenForm buttonName={'Create group'} func={'OpenGroupForm'}/>
                        <ButtonOpenForm buttonName={'Create order'} func={'OpenOrderForm'}/>
                        <GetExelFile/>
                    </div>
                    <img className={css.okten_logo} src={okten_logo} alt="okten_logo"/>
                </Offcanvas.Body>
            </Offcanvas>
            <div className={css.table}>
                <div>
                    <ListGroup className={css.table_data} horizontal>
                        <ListGroup.Item className={css.table_header} onClick={orderById}>id</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByName}>name</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderBySurName}>surname</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByEmail}>email</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByPhone}>phone</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByAge}>age</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCourse}>course</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCourseFormat}>course_format</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCourseType}>course_type</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByStatus}>status</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderBySum}>sum</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderAlReadyPaid}>paid</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByGroup}>group</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCreated}>created at</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByManager}>manager</ListGroup.Item>
                    </ListGroup>
                </div>
                <div>
                    {orders.map(order => <Order key={order.id} order={order}/>)}
                </div>
            </div>
        </div>
    );
};

export {
    Orders
};
