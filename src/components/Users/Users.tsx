import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {User} from "../User/User";
import {userActions} from "../../redux";

const Users: FC = () => {
    const {users, trigger} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch, trigger]);

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
