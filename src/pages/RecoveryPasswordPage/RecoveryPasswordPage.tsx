import { FC } from 'react';

import { RegisterFormApp } from "../../components";

import main_css from '../../styles/main.module.css';


const RecoveryPasswordPage: FC = () => {
    return (
        <div className={main_css.start_page}>
            <RegisterFormApp funcName='recoveryPasswordPage' />
        </div>
    );
};

export {
    RecoveryPasswordPage
};
