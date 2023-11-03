import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";


interface IProps {
    id: number;
}

const UserStatistic: FC<IProps> = ({id}) => {
    const {userStatistic} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const {count_orders, in_work, agree} = userStatistic;
    useEffect(() => {
        dispatch(userActions.getStatisticUser({id}));
    }, [dispatch, id]);

    return (
        <div>
            <h4>Statistic</h4>
            <div>Orders: {count_orders}</div>
            <div>In work: {in_work}</div>
            <div>Agree: {agree}</div>
        </div>
    );
};

export {
    UserStatistic
};
