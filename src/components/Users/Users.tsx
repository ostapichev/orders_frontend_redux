import {FC, useEffect, useRef} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {userActions} from "../../redux";
import {useSearchParams} from "react-router-dom";

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
    }, [trigger, query, dispatch]);

    return (
        <div>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
        </div>
    );
};

export {
    Users
};
