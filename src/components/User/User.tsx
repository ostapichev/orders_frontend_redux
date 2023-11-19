import {FC, MouseEventHandler, useEffect} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IUser} from "../../interfaces";
import {authActions, adminActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './User.module.css';
import css_btn from '../ButtonOpenForm/ButtonOpenForm.module.css'


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, email, profile, is_active, last_login} = user;
    const dispatch = useAppDispatch();
    const {userStatistic} = useAppSelector(state => state.adminReducer);
    const {count_orders, in_work, agree} = userStatistic;
    const formData: FormData = new FormData();
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.ban({id: user.id.toString()}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.unban({id: user.id.toString()}));
    };
    const activateUser: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.activateUser({formData}));
    };
    const recoveryPassword: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.recoveryPassword({formData}));
    };
    useEffect(() => {
        dispatch(adminActions.getStatisticUser({id}));
    }, [dispatch, id]);

    return (
        <div className={css.container_user}>
            <div className={css.block_user}>
                <div className={css.user_content}>id: <span className={css.user_data}>{id}</span></div>
                <div className={css.user_content}>email: <span className={css.user_data}>{email}</span></div>
                <div className={css.user_content}>name: <span className={css.user_data}>{profile.name}</span></div>
                <div className={css.user_content}>surname: <span className={css.user_data}>{profile.surname}</span></div>
                <div className={css.user_content}>is active: <span className={css.user_data}>{is_active === true ? 'yes' : 'no'}</span></div>
                <div className={css.user_content}>last login: <span className={css.user_data}>
                    {last_login !== null ? <DateFormat originalDate={last_login}/> : ' no data'}</span>
                </div>
            </div>
            <div className={css.user_statistics}>
                <div className={css.user_content}>total orders: <span className={css.user_data}>{count_orders}</span></div>
                <div className={css.user_content}>in work: <span className={css.user_data}>{in_work}</span></div>
                <div className={css.user_content}>agree: <span className={css.user_data}>{agree}</span></div>
            </div>
            <div className={css.block_button}>
                <button className={css_btn.btn_open}
                        onClick={(event) => is_active === true ? ban(event) : unban(event)}>
                    {is_active === true ? 'ban' : 'unban'}
                </button>
                <button className={css_btn.btn_open}
                        onClick={(event) => is_active === true ? recoveryPassword(event) : activateUser(event)}>
                    {is_active === true ? 'recovery password' : 'activate user'}
                </button>
            </div>
        </div>
    );
};

export {
    User
};
