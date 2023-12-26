import {FC} from 'react';

import {adminActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Pagination.module.css';
import {IPromiseVoid} from "../../types";


interface IProps {
    namePage: string;
}

const Pagination: FC<IProps> = ({namePage}) => {
    const dispatch = useAppDispatch();
    const {prevPageOrders, nextPageOrders} = useAppSelector(state => state.orderReducer);
    const {prevPageAdmin, nextPageAdmin} = useAppSelector(state => state.adminReducer);
    const buttonDisabled = () => {
        if (namePage === 'homePage') {
            return [prevPageOrders, nextPageOrders];
        } else if (namePage === 'adminPage') {
            return [prevPageAdmin, nextPageAdmin];
        }
        console.error('disabled pagination button error');
    };
    const prev: IPromiseVoid = async () => {
        switch (namePage) {
            case ('homePage'):
                dispatch(orderActions.decPage());
                break;
            case ('adminPage'):
                dispatch(adminActions.decPage());
                break;
            default:
                alert('Pagination: name page error');
        }
    };
    const next: IPromiseVoid = async () => {
        switch (namePage) {
            case ('homePage'):
                dispatch(orderActions.incPage());
                break;
            case ('adminPage'):
                dispatch(adminActions.incPage());
                break;
            default:
                alert('Pagination: name page error');
        }
    };
    const disabled = buttonDisabled();

    return (
        <div className={css.block_pagination}>
            <button className={css.button_paginate} disabled={!disabled[0]} onClick={prev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <button className={css.button_paginate} disabled={!disabled[1]} onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    );
};

export  {
    Pagination
};
