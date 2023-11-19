import {FC, useEffect, useRef} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {adminActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {ButtonOpenForm} from "../ButtonOpenForm/ButtonOpenForm";

import css from './Users.module.css';


const Users: FC = () => {
    const {users, trigger, loading} = useAppSelector(state => state.adminReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        dispatch(adminActions.getAll({page: query.get('page')}));
    }, [dispatch, query, trigger]);

    return (
        <div className={loading ? css.table_none : css.table_users}>
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
