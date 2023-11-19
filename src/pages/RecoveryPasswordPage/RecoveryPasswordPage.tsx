import {FC} from 'react';

import {RegisterForm} from "../../components";

import css from '../LoginPage/LoginPage.module.css';


const RecoveryPasswordPage: FC = () => {
    return (
        <div className={css.login_page}>
            <RegisterForm funcName={'RecoveryPasswordPage'}/>
        </div>
    );
};

export {
    RecoveryPasswordPage
};