import {FC, useCallback, useEffect} from 'react';

import {adminActions} from "../../redux";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {DataMessage} from "../DataMessage/DataMessage";
import {IFuncVoid} from "../../types";
import {IParams} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {User} from "../User/User";

import css from './Users.module.css';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const {
        users, trigger, showParams, pageUsers, surnameUserInput
    } = useAppSelector(state => state.adminReducer);
    const [query, setQuery] = useSearchParams();
    const getAllUsers: IFuncVoid = useCallback( () => {
        const params: IParams = {};
        params.page = query.get('page');
        params.surname_contains = query.get('surname_contains');
        dispatch(adminActions.getAll({ params }));
    }, [dispatch, query]);
    const updateQueryString: IFuncVoid = useCallback( () => {
        const queryParams: string[] = []
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(pageUsers)}`);
        }
        if (surnameUserInput) {
            queryParams.push(`surname_contains=${encodeURIComponent(surnameUserInput)}`);
        }
        const queryString: string = queryParams.join('&');
        setQuery(queryString && `?${queryString}`);
    }, [pageUsers, showParams, surnameUserInput, setQuery]);
    useEffect(() => {
        updateQueryString();
    }, [updateQueryString]);
    useEffect(() => {
        getAllUsers();
    }, [dispatch, query, trigger, getAllUsers]);

    return (
        <div className={css.table_users}>
            <div className={css.table_head}>
                <div className={css.head_user}>Users</div>
                <div className={css.btn_user_create}>
                    <ButtonApp />
                </div>
            </div>
            {
                users.map(user => <User
                    key={ user.id }
                    user={ user }
                />)
            }
            <DataMessage />
        </div>
    );
};

export {
    Users
};
