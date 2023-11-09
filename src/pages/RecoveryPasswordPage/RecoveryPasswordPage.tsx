import {FC} from 'react';

import {RecoveryPasswordForm} from "../../components";

import css from '../LoginPage/LoginPage.module.css';


const RecoveryPasswordPage: FC = () => {
    return (
        <div className={css.bg_lf}>
            <RecoveryPasswordForm/>
        </div>
    );
};

export {
    RecoveryPasswordPage
};