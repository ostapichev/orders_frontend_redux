import {FC} from 'react';

import {ActivateForm} from "../../components";

import css from '../LoginPage/LoginPage.module.css';

const ActivatePage: FC = () => {
    return (
        <div className={css.bg_lf}>
            <ActivateForm/>
        </div>
    );
};

export {
    ActivatePage
};
