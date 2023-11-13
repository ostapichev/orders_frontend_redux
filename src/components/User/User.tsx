import {FC, MouseEventHandler, useEffect} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IUser} from "../../interfaces";
import {authActions, userActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {UserStatistics} from "../UserStatistics/UserStatistics";

import css from './User.module.css';


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, email, profile, is_active, last_login} = user;
    const dispatch = useAppDispatch();
    const {userStatistic} = useAppSelector(state => state.userReducer);
    const {count_orders, in_work, agree} = userStatistic;
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
    useEffect(() => {
        dispatch(userActions.getStatisticUser({id}));
    }, [dispatch, id]);

    return (
        <div className={css.user_container}>
            <div className={css.block_data}>
                <div className={css.user_content}># - <span className={css.user_data}>{id}</span></div>
                <div className={css.user_content}>email - <span className={css.user_data}>{email}</span></div>
                <div className={css.user_content}>name - <span className={css.user_data}>{profile.name}</span></div>
                <div className={css.user_content}>
                    surname - <span className={css.user_data}>{profile.surname}</span>
                </div>
                <div className={css.user_content}>
                    is active - <span className={css.user_data}>{is_active === true ? 'yes' : 'no'}</span>
                </div>
                <div className={css.user_content}>
                    last login - <span className={css.user_data}>
                        {last_login !== null ? <DateFormat originalDate={last_login}/> : 'no data'}
                    </span>
                </div>
            </div>
            <div className={css.block_stat}>
                <div className={css.user_statistics}>
                    <div className={css.stat_content}>
                        Orders <span className={css.count_content}>{count_orders}</span>
                    </div>
                    <div className={css.stat_content}>
                        In work <span className={css.count_content}>{in_work}</span>
                    </div>
                    <div className={css.stat_content}>
                        Agree <span className={css.count_content}>{agree}</span>
                    </div>
                </div>
            </div>
            <div className={css.block_button}>
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
