import {FC} from 'react';

import {RegisterFormApp} from "../../components";

import {page_css} from '../../styles/index';

const RegisterPage: FC = () => {

    return (
        <div className={page_css.start_page}>
            <RegisterFormApp funcName='activateRequestUser' />
        </div>
    );
};

export {
    RegisterPage
};
