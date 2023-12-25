import {FC} from 'react';

import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './OrdersPagination.module.css';


const OrdersPagination: FC = () => {
    const dispatch = useAppDispatch();
    const {prevPage, nextPage} = useAppSelector(state => state.orderReducer);
    const prev = async () => {
        dispatch(orderActions.decPage());
    };
    const next = async () => {
        dispatch(orderActions.incPage());
    };

    return (
        <div className={css.block_pagination}>
            <button className={css.button_paginate} disabled={!prevPage} onClick={prev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <button className={css.button_paginate} disabled={!nextPage} onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    );
};

export  {
    OrdersPagination
};
