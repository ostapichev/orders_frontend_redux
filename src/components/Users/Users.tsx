import {FC, useCallback, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {adminActions} from "../../redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ButtonOpenForm} from "../ButtonOpenForm/ButtonOpenForm";

import css from './Users.module.css';
import {IParams} from "../../interfaces";


const Users: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {users, trigger, showParams, pageUsers, surnameUserInput, launchSearch} = useAppSelector(state => state.adminReducer);
    const [query] = useSearchParams();
    const getAllUsers = useCallback(() => {
        const params: IParams = {};
        params.page = query.get('page');
        params.surname_contains = query.get('surname_contains');
        dispatch(adminActions.getAll({params}));
    }, [dispatch, query]);
    const updateQueryString = useCallback(() => {
        const queryParams: string[] = []
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(pageUsers)}`);
        }
        if (launchSearch) {
            queryParams.push(`surname_contains=${encodeURIComponent(surnameUserInput)}`);
        }
        const queryString: string = queryParams.join('&');
        navigate(queryString && `?${queryString}`);
    }, [pageUsers, showParams, navigate, launchSearch]);
    useEffect(() => {
        updateQueryString();
    }, [updateQueryString, surnameUserInput]);
    useEffect(() => {
        getAllUsers();
    }, [dispatch, query, trigger, getAllUsers]);

    return (
        <div className={css.table_users}>
            <div className={css.table_head}>
                <div className={css.head_user}>Users</div>
                <div className={css.btn_user_create}>
                    <ButtonOpenForm buttonName={'Create'} func={'OpenUserForm'}/>
                </div>
            </div>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
        </div>
    );
};

export {
    Users
};
