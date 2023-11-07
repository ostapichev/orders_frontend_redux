import {FC} from 'react';

import {LoginForm} from "../../components";

import css from './LoginPage.module.css'


const LoginPage: FC = () => {
    return (
        <div className={css.bg_lf}>
            <LoginForm/>
        </div>
    );
};

export {
    LoginPage
};
