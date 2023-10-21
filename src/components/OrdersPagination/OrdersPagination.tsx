import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";


const OrdersPagination: FC = () => {
    const {loading, totalPages} = useAppSelector((state) => state.orderReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const currentPage = +query.get('page');
    const prev = async () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = async () => {
        setQuery(next => ({...next, page: +next.get('page')+1}));
    };
    useEffect(() => {
        dispatch(orderActions.getTotalPages());
    }, [dispatch]);

    return (
        <div>
            <button disabled={loading || currentPage === 1} onClick={prev}>prev</button>
            <button disabled={loading || currentPage === totalPages} onClick={next}>next</button>
        </div>
    );
};

export  {
    OrdersPagination
};
