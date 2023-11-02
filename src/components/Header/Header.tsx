import {FC, MouseEventHandler, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import {authActions} from "../../redux";
import {authService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Header: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const logout: MouseEventHandler<HTMLAnchorElement> = () => {
        localStorage.removeItem('checkboxState');
        dispatch(authActions.logout());
    };
    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me());
        }
    }, [dispatch, me]);

    return (
        <div>
            <h1>Logo</h1>
            { me ?
                <ul>
                    <h2>User: {me.profile.surname}</h2>
                    <li>
                        <NavLink to={'login'} onClick={logout}>Logout</NavLink>
                    </li>
                </ul>
                :
                <ul>
                    <li>
                        <NavLink to={'login'}>Login</NavLink>
                    </li>
                </ul>
            }
        </div>
    );
};

export {
    Header
};
