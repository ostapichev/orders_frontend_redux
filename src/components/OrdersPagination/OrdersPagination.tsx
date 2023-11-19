import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux";


const OrdersPagination: FC = () => {
    const dispatch = useAppDispatch();
    const {loading, checkbox} = useAppSelector(state => state.orderReducer);
    const {orderStatistic} = useAppSelector(state => state.adminReducer);
    const {item_count} = orderStatistic;
    const lastPage = Math.ceil(item_count / 3);
    const [query, setQuery] = useSearchParams();
    const currentPage = +query.get('page');
    const prev = async () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = async () => {
        setQuery(next => ({...next, page: +next.get('page')+1}));
    };
    useEffect(() => {
        dispatch(adminActions.getStatisticOrder());
    }, [dispatch, checkbox]);

    return (
        <div>
            <button disabled={loading || currentPage === 1} onClick={prev}>prev</button>
            <button disabled={loading || currentPage === lastPage} onClick={next}>next</button>
        </div>
    );
};

export  {
    OrdersPagination
};
