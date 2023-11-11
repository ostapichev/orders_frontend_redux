import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

import css from './UserPagination.module.css';


const UserPagination: FC = () => {
    const dispatch = useAppDispatch();
    const {loading, orderStatistic} = useAppSelector(state => state.userReducer);
    const {user_count} = orderStatistic;
    const lastPage = Math.ceil((user_count / 3) - 1);
    const [query, setQuery] = useSearchParams();
    const currentPage = +query.get('page');
    const prev = async () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = async () => {
        setQuery(next => ({...next, page: +next.get('page')+1}));
    };
    useEffect(() => {
        dispatch(userActions.getStatisticOrder());
    }, [dispatch]);

    return (
        <div className={css.block_paginate}>
            <button className={css.btn_paginate} disabled={loading || currentPage === 1} onClick={prev}></button>
            <button className={css.btn_paginate} disabled={loading || currentPage === lastPage} onClick={next}></button>
        </div>
    );
};

export  {
    UserPagination
};
