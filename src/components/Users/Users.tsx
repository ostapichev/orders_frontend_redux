import {FC, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useSearchParams} from "react-router-dom";

import {adminActions} from "../../redux";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {DataMessage} from "../DataMessage/DataMessage";
import {IParams} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";

import css from './Users.module.css';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const {users, trigger, paramsUsers, showParams} = useAppSelector(state => state.adminReducer);
    const [query, setQuery] = useSearchParams();
    const [debouncedPage] = useDebounce<string>(query.get('page'), 1000);
    const [debouncedSearchUserSurname] = useDebounce<string>(query.get('surname'), 1000);
    useEffect(() => {
        const queryParams: string[] = []
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(paramsUsers.page)}`);
        }
        if (paramsUsers.surname) {
            queryParams.push(`surname=${encodeURIComponent(paramsUsers.surname)}`);
        }
        if (queryParams.length) {
            setQuery(`?${queryParams.join('&')}`);
        }
    }, [paramsUsers, showParams, setQuery]);
    useEffect(() => {
        const params: IParams = {};
        params.page = debouncedPage;
        params.surname = debouncedSearchUserSurname;
        dispatch(adminActions.getAll({ params }));
    }, [dispatch, trigger, debouncedPage, debouncedSearchUserSurname]);

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
