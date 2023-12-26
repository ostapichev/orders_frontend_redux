import {FC, MouseEventHandler} from 'react';
import {NavLink} from "react-router-dom";

import {adminActions, authActions, orderActions} from "../../redux";
import {IOrderBy} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Header.module.css';

import {admin_panel, home_page, log_out, okten_school} from '../../asserts';


const Header: FC = () => {
    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.authReducer);
    const isAdmin = me?.is_superuser || false;
    const defaultFilterOrders: IOrderBy = () => {
        dispatch(orderActions.setCheckBoxDefault());
        dispatch(orderActions.setOrderByDefault());
        dispatch(orderActions.resetPage());
        dispatch(adminActions.resetPage());
    };
    const logout: MouseEventHandler<HTMLAnchorElement> = () => {
        defaultFilterOrders();
        dispatch(authActions.logout());
    };
    const paramsDefault:IOrderBy = () => {
        defaultFilterOrders();
    };

    return (
        <div className={css.header}>
            <div>
                <NavLink to={'https://owu.com.ua/'} target='_blank'>
                    <img className={css.logo} src={okten_school} alt="okten_school"/>
                </NavLink>
            </div>
            <div>
                {me ?
                    <div className={css.nav_bar}>
                        <div className={css.user_name}>
                            <div className={css.title_username}>Current user</div>
                            <div className={css.login_name}>{me.profile.surname}</div>
                        </div>
                        { isAdmin &&
                            <div className={css.login_link}>
                                <NavLink to={'/admin'} onClick={defaultFilterOrders}>
                                    <img className={css.logout} src={admin_panel} alt="admin"/>
                                </NavLink>
                            </div>
                        }
                        <div className={css.login_link}>
                            <NavLink to={'/orders'} onClick={paramsDefault}>
                                <img className={css.logout}  src={home_page} alt="home"/>
                            </NavLink>
                        </div>
                        <div className={css.login_link}>
                            <NavLink to={'/login'} onClick={logout}>
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
