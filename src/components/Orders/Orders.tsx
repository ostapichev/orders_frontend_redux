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


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, trigger, sorted, checkbox, nameInputData, surNameInputData, emailInputData, openModal} = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const getAllOrders = useCallback((sorting: string,  manager='', searchName: string, searchSurname: string, searchEmail: string) => {
        dispatch(orderActions.getAll({
            page: query.get('page'),
            name_contains: searchName,
            surname_contains: searchSurname,
            email_contains: searchEmail,
            order_by: sorting,
            manager}));
        },[dispatch, query]);
    const handleClose: IOrderBy = () => {
        dispatch(orderActions.setShowModal(false));
    };
    const sortingCheckBox: ISortingReverse = (orderBy: string) => {
        checkbox ? getAllOrders(orderBy, me.profile.name, searchName, searchSurname, searchEmail) : getAllOrders(orderBy, '', searchName, searchSurname, searchEmail);
    };
    const sortingReverse: ISortingReverse = (orderBy: string) => {
        sorted ? sortingCheckBox(orderBy) : sortingCheckBox(`-${orderBy}`);
        dispatch(orderActions.setOrderBy());
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
    const searchName = nameInputData ? nameInputData : '';
    const searchSurname = surNameInputData ? surNameInputData : '';
    const searchEmail = emailInputData ? emailInputData : '';
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect( () => {
        checkbox ? getAllOrders('-id', me.profile.name, searchName, searchSurname, searchEmail) : getAllOrders('-id', '', searchName, searchSurname, searchEmail);
        }, [dispatch, trigger, getAllOrders, triggerComment, searchName, searchSurname, searchEmail, me.profile.name, checkbox]);

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
