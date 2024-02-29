import {FC, useEffect} from 'react';

import {adminActions} from "../../redux";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {DataMessage} from "../DataMessage/DataMessage";
import {IParams} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {User} from "../User/User";

import css from './Users.module.css';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const {users, trigger, showQuery, params} = useAppSelector(state => state.adminReducer);
    const [query, setQuery] = useSearchParams();
    useEffect(() => {
        if (showQuery) {
            const newParams: IParams = {...params};
            Object.keys(newParams).forEach((key) => {
                if (!newParams[key]) {
                    delete newParams[key];
                }
            });
            setQuery(newParams);
        } else {
            if (query.get('page')) {
                dispatch(adminActions.setPage(query.get('page')));
            }
            if (query.get('surname')) {
                dispatch(adminActions.setSearchUser(query.get('surname')));
            }
        }
    }, [dispatch, query, setQuery, params, showQuery]);
    useEffect(() => {
        const params: IParams = {};
        query.forEach((value, key) => {
            params[key] = value;
        });
        dispatch(adminActions.getAll({ params }));
    }, [dispatch, query, trigger]);

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
