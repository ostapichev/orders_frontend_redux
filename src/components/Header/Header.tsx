import {FC, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import {authActions} from "../../redux";
import {authService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Header: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me());
        }
    }, [dispatch, me]);

    return (
        <div>
            <h1>Logo</h1>
            {
                 me ?
                    <div>
                        <span>{me.profile.surname}</span>
                        <button>logout</button>
                    </div>
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
