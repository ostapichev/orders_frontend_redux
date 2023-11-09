import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

import css from './OrderStatistic.module.css';


const OrderStatistic: FC = () => {
    const {orderStatistic} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const {item_count, in_work, new_order, agree, disagree, dubbing} = orderStatistic;
    useEffect(() => {
        dispatch(userActions.getStatisticOrder());
    }, [dispatch]);

    return (
        <div className={css.statistic_container}>
            <div className={css.statistic_block}>
                <div className={css.count}>{item_count}</div>
                <div className={css.count_name}>item count</div>
            </div>
            <div className={css.statistic_block}>
                <div className={css.count}>{in_work}</div>
                <div className={css.count_name}>in work</div>
            </div>
            <div className={css.statistic_block}>
                <div className={css.count}>{new_order}</div>
                <div className={css.count_name}>new order</div>
            </div>
            <div className={css.statistic_block}>
                <div className={css.count}>{agree}</div>
                <div className={css.count_name}>agree</div>
            </div>
            <div className={css.statistic_block}>
                <div className={css.count}>{disagree}</div>
                <div className={css.count_name}>disagree</div>
            </div>
            <div className={css.statistic_block}>
                <div className={css.count}>{dubbing}</div>
                <div className={css.count_name}>dubbing</div>
            </div>
        </div>
    );
};

export {
    OrderStatistic
};