import {FC, useCallback, useEffect, useRef} from 'react';
import {useSearchParams} from "react-router-dom";

import {Order} from "../Order/Order";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, trigger, sorted, checkbox} = useAppSelector(state => state.orderReducer);
    const {triggerComment} = useAppSelector(state => state.commentReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const getAllOrders = useCallback((sorting: string, manager='') => {
        dispatch(orderActions.getAll({ page: query.get('page'), order_by: sorting, manager}));
        },[dispatch, query]);
    const getMyOrders = useCallback((sorting: string, manager: string) => {
        dispatch(orderActions.getAll({ page: query.get('page'), order_by: sorting, manager}));
    },[dispatch, query]);
    const sortingRevers = (orderBy: string) => {
        if (sorted) {
            getAllOrders(orderBy);
        } else {
            getAllOrders(`-${orderBy}`);
        }
        dispatch(orderActions.setOrderBy());
    };
    const sortingOrders = () => {
        if (checkbox) {
            getMyOrders('-id', me.profile.name);
        } else {
            getAllOrders('-id');
        }
        dispatch(orderActions.setCheckBox());
    }
    const orderById = () => {
        sortingRevers('id');
    };
    const orderByName = () => {
        sortingRevers('name');
    };
    const orderBySurName = () => {
        sortingRevers('surname');
    };
    const orderByEmail = () => {
        sortingRevers('email');
    };
    const orderByPhone = () => {
        sortingRevers('phone');
    };
    const orderByAge = () => {
        sortingRevers('age');
    };
    const orderByCourse = () => {
        sortingRevers('course');
    };
    const orderByCourseFormat = () => {
        sortingRevers('course_format');
    };
    const orderByCourseType = () => {
        sortingRevers('course_type');
    };
    const orderByStatus = () => {
        sortingRevers('status');
    };
    const orderBySum = () => {
        sortingRevers('sum');
    };
    const orderAlReadyPaid = () => {
        sortingRevers('already_paid');
    };
    const orderByGroup = () => {
        sortingRevers('group');
    };
    const orderByCreated = () => {
        sortingRevers('created_at');
    };
    const orderByManager = () => {
        sortingRevers('manager');
    };
    const handler = () => {
        sortingOrders();
    };
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect( () => {
        getAllOrders('-id', me.profile.name);
        }, [dispatch, getAllOrders, query, trigger, triggerComment]);

    return (
        <div>
            <div>
                <label htmlFor="myOrders">
                    <input type="checkbox" defaultChecked name="myOrders" onClick={handler}/>
                    My orders
                </label>
                <button onClick={orderById}>id</button>
                <button onClick={orderByName}>name</button>
                <button onClick={orderBySurName}>surname</button>
                <button onClick={orderByEmail}>email</button>
                <button onClick={orderByPhone}>phone</button>
                <button onClick={orderByAge}>age</button>
                <button onClick={orderByCourse}>course</button>
                <button onClick={orderByCourseFormat}>course format</button>
                <button onClick={orderByCourseType}>course type</button>
                <button onClick={orderByStatus}>status</button>
                <button onClick={orderBySum}>sum</button>
                <button onClick={orderAlReadyPaid}>already paid</button>
                <button onClick={orderByGroup}>group</button>
                <button onClick={orderByCreated}>created at</button>
                <button onClick={orderByManager}>manager</button>
            </div>
            <hr/>
            {
                orders.map(order => <Order key={order.id} order={order}/>)
            }
        </div>
    );
};

export {
    Orders
};
