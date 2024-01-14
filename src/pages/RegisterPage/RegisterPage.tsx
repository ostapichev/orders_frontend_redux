import { FC } from 'react';

import { RegisterFormApp } from "../../components";

import main_css from '../../styles/main.module.css';


const RegisterPage: FC = () => {
    return (
        <div className={main_css.start_page}>
            <RegisterFormApp funcName='activateRequestUser' />
        </div>
    );
};

export {
    RegisterPage
};
