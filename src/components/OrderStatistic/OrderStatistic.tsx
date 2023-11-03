import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";


const OrderStatistic: FC = () => {
    const {orderStatistic} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const {item_count, in_work, new_order, agree, disagree, dubbing} = orderStatistic;
    useEffect(() => {
        dispatch(userActions.getStatisticOrder());
    }, [dispatch]);

    return (
        <div>
            <h3>Orders statistic</h3>
            <p>item count: {item_count}</p>
            <p>in work: {in_work}</p>
            <p>new order: {new_order}</p>
            <p>agree: {agree}</p>
            <p>disagree: {disagree}</p>
            <p>dubbing: {dubbing}</p>
        </div>
    );
};

export {
    OrderStatistic
};