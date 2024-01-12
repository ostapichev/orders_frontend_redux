import { FC, MouseEventHandler } from 'react';
import { NavLink } from "react-router-dom";

import { adminActions, authActions, orderActions } from "../../redux";
import { IFuncVoid } from "../../types";
import { Profile } from "../Profile/Profile";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './Header.module.css';

import { admin_panel, home_page, login, log_out, okten_school } from '../../asserts';


const Header: FC = () => {
    const dispatch = useAppDispatch();
    const { me } = useAppSelector(state => state.authReducer);
    const isAdmin = me?.is_superuser || false;
    const defaultParamsOrders: IFuncVoid = () => {
        dispatch(orderActions.resetParams());
    };
    const defaultParamsUsers: IFuncVoid = () => {
        dispatch(adminActions.resetParams());
    };
    const logout: MouseEventHandler<HTMLAnchorElement> = () => {
        defaultParamsOrders();
        defaultParamsUsers();
        dispatch(authActions.logout());
    };

    return (
        <div className={css.header}>
            <div>
                <NavLink
                    to={'https://owu.com.ua/'}
                    target='_blank'
                >
                    <img className={css.logo} src={ okten_school } alt="okten_school"/>
                </NavLink>
            </div>
            <div>
                { me ?
                    <div className={css.nav_bar}>
                        <Profile/>
                        { isAdmin &&
                            <div className={css.login_link}>
                                <NavLink
                                    to={'/admin'}
                                    onClick={ defaultParamsUsers }
                                >
                                    <img className={css.logout} src={ admin_panel } alt="admin"/>
                                </NavLink>
                            </div>
                        }
                        { isAdmin &&
                            <div className={css.login_link}>
                                <NavLink
                                    to={'/orders'}
                                    onClick={ defaultParamsOrders }
                                >
                                    <img className={css.logout} src={ home_page } alt="home"/>
                                </NavLink>
                            </div>
                        }
                        <div className={css.login_link}>
                            <NavLink
                                to={'/login'}
                                onClick={ logout }
                            >
                                <img className={css.logout} src={ log_out } alt="logout"/>
                            </NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <p className={css.login_link}>
                            <NavLink to={'/login'}>
                                <img className={css.logout} src={ login } alt="logout"/>
                            </NavLink>
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
