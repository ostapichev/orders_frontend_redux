import {FC} from 'react';

import {RegisterForm} from "../../components";

import css from '../LoginPage/LoginPage.module.css';


const RegisterPage: FC = () => {
    return (
        <div className={css.login_page}>
            <RegisterForm funcName={'activateRequestUser'}/>
        </div>
    );
};

export {
    RegisterPage
};
