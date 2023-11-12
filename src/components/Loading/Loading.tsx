import {FC} from 'react';

import css from './Loading.module.css';

import logoRotate from '../../asserts/images/okten_loading.png';


const Loading: FC = () => {
    return (
        <div className={css.container}>
            <img className={css.logo_loading} src={logoRotate} alt="logoRotate"/>
            <h1 className={css.title_loading}>LOADING...</h1>
            <div className={css.overlay}></div>
        </div>
    );
};

export {
    Loading
};