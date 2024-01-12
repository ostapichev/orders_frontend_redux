import { FC, MouseEventHandler } from 'react';

import { authActions, adminActions } from "../../redux";
import { DateFormat } from "../DateFormat/DateFormat";
import { IUser } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { UserStatistics } from "../UserStatistics/UserStatistics";

import css from './User.module.css';
import main_css from '../../styles/main.module.css';


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const { id, email, profile, is_active, last_login } = user;
    const dispatch = useAppDispatch();
    const formData: FormData = new FormData();
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.ban({ id: user.id.toString() }));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.unban({ id: user.id.toString() }));
    };
    const activateUser: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.activateUser({ formData }));
    };
    const recoveryPassword: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.recoveryPassword({ formData }));
    };

    return (
        <div className={css.container_user}>
            <div className={css.block_user}>
                <div className={css.user_content}>id: <span className={css.user_data}>{ id }</span></div>
                <div className={css.user_content}>email: <span className={css.user_data}>{ email }</span></div>
                <div className={css.user_content}>name: <span className={css.user_data}>{ profile.name }</span></div>
                <div className={css.user_content}>surname: <span className={css.user_data}>{ profile.surname }</span></div>
                <div className={css.user_content}>is active:
                    <span className={css.user_data}>{ is_active === true ? 'yes' : 'no' }</span>
                </div>
                <div className={css.user_content}>last login: <span className={css.user_data}>
                    { last_login !== null ? <DateFormat originalDate={last_login}/> : ' no data' }</span>
                </div>
            </div>
            <UserStatistics id={ user.id }/>
            <div className={css.block_button}>
                <button
                    className={main_css.btn_open}
                    onClick={ (event) => is_active === true ? ban(event) : unban(event) }
                >
                    {is_active === true ? 'ban' : 'unban'}
                </button>
                <button
                    className={main_css.btn_open}
                    onClick={ (event) => is_active === true ? recoveryPassword(event) : activateUser(event) }
                >
                    { is_active === true ? 'recovery' : 'activate user' }
                </button>
            </div>
        </div>
    );
};

export {
    User
};
