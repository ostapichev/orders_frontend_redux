import {FC} from 'react';

import {IUserStatistic} from "../../interfaces/statistic.interface";

import css from './UserStatistics.module.css';


interface IProps {
    statistic: IUserStatistic;
}

const UserStatistics: FC<IProps> = ({statistic}) => {
    const {id, count_orders, in_work, agree} = statistic;

    return (
        <div className={css.user_statistics}>
            <div className={css.user_content}>USER ID: <span className={css.user_data}>{id}</span></div>
            <div className={css.user_content}>total orders: <span className={css.user_data}>{count_orders}</span></div>
            <div className={css.user_content}>in work: <span className={css.user_data}>{in_work}</span></div>
            <div className={css.user_content}>agree: <span className={css.user_data}>{agree}</span></div>
        </div>
    );
};

export {
    UserStatistics
};
