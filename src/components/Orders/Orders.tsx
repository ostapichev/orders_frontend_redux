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
    const params = {};
    const getAllOrders = useCallback((params: IParams) => {
        if (checkbox) {
            params.manager = me.profile.name;
        }
        if (!sorted) {
            params.order_by = query.get('order_by');
        }
        console.log(params);
        dispatch(orderActions.getAll({params}));
        },[dispatch, query]);
    const handleClose: IOrderBy = () => {
        dispatch(orderActions.setShowModal(false));
    };
    const orderById: IOrderBy = () => {
        sorted ? setQueryRef.current(prev => ({ ...prev, order_by: 'id' })) : setQueryRef.current(prev => ({ ...prev, order_by: '-id' }));
        dispatch(orderActions.setOrderBy());
    }
    useEffect( () => {
        getAllOrders(params);
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
                        <ListGroup.Item className={css.table_header} >name</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >surname</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >email</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >phone</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >age</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >course</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >course_format</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >course_type</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >status</ListGroup.Item>
                        <ListGroup.Item className={css.table_header}>sum</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >paid</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >group</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >created at</ListGroup.Item>
                        <ListGroup.Item className={css.table_header} >manager</ListGroup.Item>
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
