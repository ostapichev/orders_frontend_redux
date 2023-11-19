import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux";

import css from './UserStatistics.module.css';


interface IProps {
    id: number;
}

const UserStatistics: FC<IProps> = ({id}) => {
    const {userStatistic} = useAppSelector(state => state.adminReducer);
    const dispatch = useAppDispatch();
    const {count_orders, in_work, agree} = userStatistic;
    useEffect(() => {
        dispatch(adminActions.getStatisticUser({id}));
    }, [dispatch, id]);

    return (
        <div className={css.user_statistics}>
            <div className={css.stat_content}>
                Orders <span className={css.count_content}>{count_orders}</span>
            </div>
            <div className={css.stat_content}>
                In work <span className={css.count_content}>{in_work}</span>
            </div>
            <div className={css.stat_content}>
                Agree <span className={css.count_content}>{agree}</span>
            </div>
        </div>
    );
};

export {
    UserStatistics
};
