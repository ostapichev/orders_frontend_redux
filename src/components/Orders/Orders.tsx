import {FC, useCallback, useEffect} from 'react';
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
    const {orders, trigger, sorted, checkbox, openModal} = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const getAllOrders = useCallback(() => {
        const params: IParams = {};
        if (checkbox) {
            params.manager = me.profile.name;
        }
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
        params.created_at_before = query.get('end_date')
        console.log(params);
        dispatch(orderActions.getAll({params}));
    },[dispatch, query, checkbox, me.profile.name]);
    const handleClose: IOrderBy = () => {
        dispatch(orderActions.setShowModal(false));
    };
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        if (sorted) {
            setQuery(prev => ({ ...prev, order_by}));
        } else {
            setQuery(prev => ({ ...prev, order_by: `-${order_by}`}));
        }
        dispatch(orderActions.setOrderBy());
    }
    const orderById: IOrderBy = () => sortingOrderBy('id');
    const orderByName: IOrderBy = () => sortingOrderBy('name');
    const orderBySurName: IOrderBy = () => sortingOrderBy('surname');
    const orderByEmail: IOrderBy = () => sortingOrderBy('email');
    const orderByPhone: IOrderBy = () => sortingOrderBy('phone');
    const orderByAge: IOrderBy = () => sortingOrderBy('age');
    const orderByCourse: IOrderBy = () => sortingOrderBy('course');
    const orderByCourseFormat: IOrderBy = () => sortingOrderBy('course_format');
    const orderByCourseType: IOrderBy = () => sortingOrderBy('course_type');
    const orderByStatus: IOrderBy = () => sortingOrderBy('status');
    const orderBySum: IOrderBy = () => sortingOrderBy('sum');
    const orderByPaid: IOrderBy = () => sortingOrderBy('already_paid');
    const orderByGroup: IOrderBy = () => sortingOrderBy('group');
    const orderByCreated: IOrderBy = () => sortingOrderBy('created_at');
    const orderByManager: IOrderBy = () => sortingOrderBy('manager');
    useEffect( () => {
        getAllOrders();
    }, [dispatch, trigger, getAllOrders, triggerComment, me.profile.name, checkbox]);

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
                        <ListGroup.Item className={css.table_header} onClick={orderByCourseFormat}>
                            course_format
                        </ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCourseType}>
                            course_type
                        </ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByStatus}>status</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderBySum}>sum</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByPaid}>paid</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByGroup}>group</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} onClick={orderByCreated}>
                            created at
                        </ListGroup.Item>
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
