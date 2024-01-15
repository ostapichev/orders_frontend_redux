import { AxiosError } from "axios";
import { FC, useEffect, useMemo, useState } from 'react';

import { adminService } from "../../services";
import { IUserStatistic } from "../../interfaces/statistic.interface";


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
    const { count_orders, in_work, agree, disagree, dubbing } = userStatistic;
    const queryUserStatistic = useMemo(() => async () => {
        try {
            const { data } = await adminService.getStatisticUser(id.toString());
            setUserStatistic(data);
        } catch (e) {
            const err = e as AxiosError;
            alert(err);
        }
    }, [id]);
    useEffect(() => {
        queryUserStatistic().then(value => value);
    }, [queryUserStatistic]);

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className={ (count_orders > 0) ? "fs-6 text-serif" : 'd-none' }>
                Orders:&nbsp;<span className="fw-bold fs-6 text-serif">{ count_orders }</span>
            </div>
            <div className={ (in_work > 0) ? "fs-6 text-serif" : 'd-none' }>
                In work:&nbsp;<span className="fw-bold fs-6 text-serif">{ in_work }</span>
            </div>
            <div className={ (agree > 0) ? "fs-6 text-serif" : 'd-none' }>
                Agree:&nbsp;<span className="fw-bold fs-6 text-serif">{ agree }</span>
            </div>
            <div className={ (disagree > 0) ? "fs-6 text-serif" : 'd-none' }>
                Disagree:&nbsp;<span className="fw-bold fs-6 text-serif">{ disagree }</span>
            </div>
            <div className={ (dubbing > 0) ? "fs-6 text-serif" : 'd-none' }>
                Dubbing:&nbsp;<span className="fw-bold fs-6 text-serif">{ dubbing }</span>
            </div>
        </div>
    );
};

export {
    UserStatistics
};
