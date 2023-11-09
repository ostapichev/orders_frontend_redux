import {FC, MouseEventHandler} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IUser} from "../../interfaces";
import {authActions, userActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import {UserStatistics} from "../UserStatistics/UserStatistics";

import css from './User.module.css';


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, email, profile, is_active, last_login} = user;
    const dispatch = useAppDispatch();
    const formData: FormData = new FormData();
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.ban({id: user.id.toString()}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.unban({id: user.id.toString()}));
    };
    const activateUser: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.activateUser({formData}));
    };
    const recoveryPassword: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', user.email);
        await dispatch(authActions.recoveryPassword({formData}));
    };

    return (
        <div className={css.user_container}>
            <div className={css.block_data}>
                <p className={css.title_stat}>User data</p>
                <div>id: {id}</div>
                <div>email: {email}</div>
                <div>name: {profile.name}</div>
                <div>surname: {profile.surname}</div>
                <div>is active: {is_active === true ? 'yes' : 'no'}</div>
                <div>last login: {last_login !== null ? <DateFormat originalDate={last_login}/> : 'no data'}</div>
            </div>
            <div className={css.block_stat}>
                <p className={css.title_stat}>Statistics</p>
                <UserStatistics id={id}/>
            </div>
            <div className={css.block_button}>
                <p className={css.title_stat}>Actions</p>
                <button className={css.btn_action}
                        onClick={(event) => is_active === true ? ban(event) : unban(event)}>
                            {is_active === true ? 'ban' : 'unban'}
                </button>
                <button className={css.btn_action}
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
