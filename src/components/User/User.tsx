import {FC, MouseEventHandler} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IUser} from "../../interfaces";
import {authActions, userActions} from "../../redux";
import {useAppDispatch} from "../../hooks";


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, email, profile, is_active, last_login} = user;
    const dispatch = useAppDispatch();
    const formData: FormData = new FormData();
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.ban({id: user.id.toString(), user}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.unban({id: user.id.toString(), user}));
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
        <div>
            <ul>
                <li>id: {id}</li>
                <li>email: {email}</li>
                <li>name: {profile.name}</li>
                <li>surname: {profile.surname}</li>
                <li>is active: {is_active === true ? 'yes' : 'no'}</li>
                <li>last login: {last_login !== null ? <DateFormat originalDate={last_login}/> : 'no data'}</li>
                <div>
                    <button onClick={(event) => is_active === true ? ban(event) : unban(event)}>
                        {is_active === true ? 'ban' : 'unban'}
                    </button>
                    <button onClick={(event) => is_active === true ? recoveryPassword(event) : activateUser(event)}>
                        {is_active === true ? 'recovery password' : 'activate user'}</button>
                </div>
            </ul>
        </div>
    );
};

export {
    User
};
