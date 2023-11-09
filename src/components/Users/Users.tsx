import {FC, useEffect, useRef} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {userActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {Button} from "../Button/Button";

import css from './Users.module.css';


const Users: FC = () => {
    const {users, trigger} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        dispatch(userActions.getAll({page: query.get('page')}));
    }, [dispatch, query, trigger]);

    return (
        <div className={css.table_users}>
            <div className={css.table_head}>
                <div className={css.head_user}>Users</div>
                <div className={css.btn_user_create}>
                    <Button buttonName={'Create User'}/>
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
