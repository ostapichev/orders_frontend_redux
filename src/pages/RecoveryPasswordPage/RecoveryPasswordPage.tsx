import {FC} from 'react';

import {RegisterFormApp} from "../../components";

import {page_css} from '../../styles/index';


const RecoveryPasswordPage: FC = () => {
    return (
        <div className={page_css.start_page}>
            <RegisterFormApp funcName='recoveryPasswordPage' />
        </div>
    );
};

export {
    RecoveryPasswordPage
};
