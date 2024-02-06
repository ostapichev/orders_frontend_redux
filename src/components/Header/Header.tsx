import {FC, MouseEventHandler, useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

import {adminActions, authActions, commentActions, orderActions} from "../../redux";
import {IFuncVoid} from "../../types";
import {Profile} from "../Profile/Profile";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Header.module.css';

import {admin_panel, home_page, login, log_out, okten_school} from '../../asserts';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.authReducer);
    const [, setIsActive] = useState<boolean>(true);
    const isAdmin = me?.is_superuser || false;
    const defaultParamsOrders: IFuncVoid = useCallback(() => {
        dispatch(orderActions.resetParams());
    }, [dispatch]);
    const defaultParamsUsers: IFuncVoid = useCallback(() => {
        dispatch(adminActions.resetParams());
    }, [dispatch]);
    const resetPageComments: IFuncVoid = useCallback(() => {
        dispatch(commentActions.setDefaultPaginate());
    }, [dispatch])
    const logout: MouseEventHandler<HTMLAnchorElement> = () => {
        defaultParamsOrders();
        defaultParamsUsers();
        resetPageComments();
        dispatch(authActions.logout());
    };
    useEffect(() => {
        let timeoutId: NodeJS.Timeout = null;
        const handleMouseMove: IFuncVoid = () => {
            setIsActive(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsActive(false);
                defaultParamsOrders();
                defaultParamsUsers();
                resetPageComments();
                dispatch(authActions.logout());
            }, 900000);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeoutId);
        };
    }, [dispatch, defaultParamsOrders, defaultParamsUsers, resetPageComments]);

    return (
        <div className={css.header}>
            <div>
                <NavLink
                    to='https://owu.com.ua/'
                    target='_blank'
                >
                    <img className={css.logo} src={okten_school} alt="okten_school" />
                </NavLink>
            </div>
            <div>
                { me ?
                    <div className={css.nav_bar}>
                        <Profile />
                        { isAdmin &&
                            <div className={css.header_link}>
                                <NavLink
                                    to='/orders'
                                    onClick={defaultParamsOrders}
                                >
                                    <img className={css.image_link} src={home_page} alt="home" />
                                </NavLink>
                            </div>
                        }
                        { isAdmin &&
                            <div className={css.header_link}>
                                <NavLink
                                    to='/admin'
                                    onClick={defaultParamsUsers}
                                >
                                    <img className={css.image_link} src={admin_panel} alt="admin" />
                                </NavLink>
                            </div>
                        }
                        <div className={css.header_link}>
                            <NavLink
                                to='/login'
                                onClick={logout}
                            >
                                <img className={css.image_link} src={log_out} alt="logout" />
                            </NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={css.header_link}>
                            <NavLink to='/login'>
                                <img className={css.image_link} src={login} alt="login" />
                            </NavLink>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export {
    Header
};
