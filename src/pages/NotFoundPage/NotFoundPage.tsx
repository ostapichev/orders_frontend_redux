import { FC } from 'react';

import { NotFound } from '../../components';

import css from './NotFoundPage.module.css';


const NotFoundPage: FC = () => {
    return (
        <div className={css.not_found_page}>
            <NotFound />
        </div>
    );
};

export {
    NotFoundPage
};
