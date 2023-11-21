import {FC, MouseEventHandler} from 'react';
import {NavLink} from "react-router-dom";

import {authActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Header.module.css';

import logo from '../../asserts/images/okten_logo.png';
import log_out from '../../asserts/images/logout.png';
import home_page from '../../asserts/images/home.png';
import admin_panel from '../../asserts/images/admin.png';


const Header: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const isAdmin = me?.is_superuser || false;
    const logout:  MouseEventHandler<HTMLAnchorElement> = () => {
        dispatch(authActions.logout());
    };

    return (
        <div className={css.header}>
            <img className={css.logo} src={logo} alt="logo"/>
            <div>
                { me ?
                    <div className={css.nav_bar}>
                        <div className={css.user_name}>
                            <div className={css.title_username}>Current user</div>
                            <div className={css.login_name}>{me.profile.surname}</div>
                        </div>
                        { isAdmin &&
                            <div className={css.login_link}>
                                <NavLink to={'/admin'}>
                                    <img className={css.logout} src={admin_panel} alt="admin"/>
                                </NavLink>
                            </div>
                        }
                        <div className={css.login_link}>
                            <NavLink to={'/orders'}>
                                <img className={css.logout} src={home_page} alt="home"/>
                            </NavLink>
                        </div>
                        <div className={css.login_link}>
                            <NavLink to={'login'} onClick={logout}>
                                <img className={css.logout} src={log_out} alt="logout"/>
                            </NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <p className={css.login_link}>
                            <NavLink to={'login'}>Login</NavLink>
                        </p>
                    </div>
                }
            </div>
        </div>
    );
};

export {
    Header
};
