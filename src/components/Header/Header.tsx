import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

import { adminActions, authActions, orderActions } from "../../redux";
import { history } from "../../services";
import { IFuncVoid } from "../../types";
import { Profile } from "../Profile/Profile";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './Header.module.css';

import { admin_panel, home_page, login, log_out, okten_school } from '../../asserts';


const Header: FC = () => {
    const dispatch = useAppDispatch();
    const { me } = useAppSelector(state => state.authReducer);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
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
    useEffect(() => {
        const resetTimer = () => {
            clearTimeout(timer);
            setTimer(setTimeout(() => {
                history.replace('./login?expSession=true');
                dispatch(authActions.logout());
            }, 1200000));
        };
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, [timer, dispatch]);

    return (
        <div className={ css.header }>
            <div>
                <NavLink
                    to='https://owu.com.ua/'
                    target='_blank'
                >
                    <img className={ css.logo } src={ okten_school } alt="okten_school" />
                </NavLink>
            </div>
            <div>
                { me ?
                    <div className={ css.nav_bar }>
                        <Profile />
                        { isAdmin &&
                            <div className={ css.header_link }>
                                <NavLink
                                    to='/admin'
                                    onClick={ defaultParamsUsers }
                                >
                                    <img className={ css.image_link } src={ admin_panel } alt="admin" />
                                </NavLink>
                            </div>
                        }
                        { isAdmin &&
                            <div className={ css.header_link }>
                                <NavLink
                                    to='/orders'
                                    onClick={ defaultParamsOrders }
                                >
                                    <img className={ css.image_link } src={ home_page } alt="home" />
                                </NavLink>
                            </div>
                        }
                        <div className={ css.header_link }>
                            <NavLink
                                to='/login'
                                onClick={ logout }
                            >
                                <img className={ css.image_link } src={ log_out } alt="logout" />
                            </NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <p className={css.header_link}>
                            <NavLink to='/login'>
                                <img className={ css.image_link } src={ login } alt="login" />
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
