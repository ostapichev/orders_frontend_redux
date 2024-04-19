import {FC, MouseEventHandler, useState} from 'react';

import {authActions, adminActions} from "../../redux";
import {DateFormat} from "../DateFormat/DateFormat";
import {IFuncVoid} from "../../types";
import {IUser} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {StatisticUser} from "../StatisticUser/StatisticUser";
import {url} from "../../constants";

import {button_css} from '../../styles/index';
import css from './User.module.css';

interface IProps {
    user: IUser;
    isShowText: boolean;
    click: IFuncVoid;
}

const User: FC<IProps> = ({ user, isShowText, click }) => {
    const dispatch = useAppDispatch();
    const formData: FormData = new FormData();
    const {activateToken} = useAppSelector(state => state.authReducer);
    const {id, email, profile, is_active, last_login} = user;
    const [linkToken, setLinkToken] = useState<string>(null);
    const [infoText, setInfoText] = useState<string>(null);
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.ban({id: id.toString()}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.unban({id: id.toString()}));
    };
    const activateUser: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', email);
        await dispatch(authActions.activateUser({ formData }));
    };
    const recoveryPassword: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', email);
        await dispatch(authActions.recoveryPassword({ formData }));
    };
    const getLinkActivate:  MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(authActions.activateLink({id: id.toString()}));
        setLinkToken(`${url}/activate/${activateToken?.token}`);
    };
    const copyToClipboard:  MouseEventHandler<HTMLButtonElement> = () => {
        navigator.clipboard.writeText(linkToken).then(() => setInfoText('Link copied to clipboard!'));
        setLinkToken(null);
        click();
    };

    return (
        <div className={css.container_user}>
            <div className={css.block_user}>
                <div className={css.user_content}>id:&nbsp;<span className={css.user_data}>{id}</span></div>
                <div className={css.user_content}>email:&nbsp;<span className={css.user_data}>{email}</span></div>
                <div className={css.user_content}>name:&nbsp;
                    <span className={css.user_data}>{profile.name}</span>
                </div>
                <div className={css.user_content}>surname:&nbsp;
                    <span className={css.user_data}>{profile.surname}</span>
                </div>
                <div className={css.user_content}>is active:&nbsp;
                    <span className={css.user_data}>{is_active === true ? 'yes' : 'no'}</span>
                </div>
                <div className={css.user_content}>last login:&nbsp;<span className={css.user_data}>
                    { last_login ? <DateFormat originalDate={last_login} /> : 'no data' }</span>
                </div>
            </div>
            <StatisticUser id={id}/>
            <div className={css.block_button}>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={(event) => is_active === true ? ban(event) : unban(event)}
                >
                    {is_active ? 'ban' : 'unban'}
                </button>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={(event) => is_active === true ? recoveryPassword(event) : activateUser(event)}
                >
                    {is_active ? 'recovery' : 'activate user'}
                </button>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={!linkToken ? getLinkActivate : copyToClipboard}
                >
                    { !linkToken ? 'get activate' : 'copy to clipboard' }
                </button>
                { isShowText && <div className={css.info_text}>{infoText}</div> }
            </div>
        </div>
    );
};

export {
    User
};
