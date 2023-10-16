import {FC, MouseEventHandler} from 'react';

import {DateFormat} from "../DateFormat/DateFormat";
import {IUser} from "../../interfaces";
import {userActions} from "../../redux";
import {useAppDispatch} from "../../hooks";


interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const {id, email, profile, is_active, last_login} = user;
    const dispatch = useAppDispatch();
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.ban({id: user.id.toString(), user}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(userActions.unban({id: user.id.toString(), user}));
    };

    return (
        <div>
            <ul>
                <li>id: {id}</li>
                <li>email: {email}</li>
                <li>name: {profile.name}</li>
                <li>surname: {profile.surname}</li>
                <li>is active: {is_active === true ? 'true' : 'false'}</li>
                <li>last login: {last_login !== null ? <DateFormat originalDate={last_login}/> : 'null'}</li>
                <button onClick={(event) => is_active === true ? ban(event) : unban(event)}>
                    {is_active === true ? 'Ban' : 'Unban'}
                </button>
            </ul>
        </div>
    );
};

export {
    User
};
