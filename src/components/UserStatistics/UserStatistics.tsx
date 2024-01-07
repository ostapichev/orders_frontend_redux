import {AxiosError} from "axios";
import {FC, useEffect, useMemo, useState} from 'react';

import {adminService} from "../../services";
import {IUserStatistic} from "../../interfaces/statistic.interface";

import css from './UserStatistics.module.css';
import css_user from '../User/User.module.css';

interface IProps {
    id: number;
}

const UserStatistics: FC<IProps> = ({ id }) => {
    const [userStatistic, setUserStatistic] = useState<IUserStatistic>({
        count_orders: 0,
        in_work: 0,
        agree: 0,
        disagree: 0,
        dubbing: 0
    });
    const {count_orders, in_work, agree, disagree, dubbing} = userStatistic;
    const fetchUserStatistic = useMemo(() => async () => {
        try {
            const { data } = await adminService.getStatisticUser(id.toString());
            setUserStatistic(data);
        } catch (e) {
            const err = e as AxiosError;
            console.error(err);
        }
    }, [id]);
    useEffect(() => {
        fetchUserStatistic().then(r => console.log(r));
    }, [fetchUserStatistic]);

    return (
        <div className={css.user_statistics}>
            <div className={(count_orders > 1) ? css_user.user_content : css.data_none}>
                Orders: <span className={css_user.count_content}>{count_orders}</span>
            </div>
            <div className={(in_work > 1) ? css_user.user_content: css.data_none}>
                In work: <span className={css_user.count_content}>{in_work}</span>
            </div>
            <div className={(agree > 1) ? css_user.user_content: css.data_none}>
                Agree: <span className={css_user.count_content}>{agree}</span>
            </div>
            <div className={(disagree > 1) ? css_user.user_content: css.data_none}>
                Disagree: <span className={css_user.count_content}>{disagree}</span>
            </div>
            <div className={(dubbing > 1) ? css_user.user_content: css.data_none}>
                Dubbing: <span className={css_user.count_content}>{dubbing}</span>
            </div>
        </div>
    );
};

export {
    UserStatistics
};
