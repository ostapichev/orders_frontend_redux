import { FC, MouseEventHandler } from 'react';

import { useAppSelector } from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import { exel } from "../../asserts";


const GetExelFile: FC = () => {
    const { fileDataURL } = useAppSelector(state => state.orderReducer);
    const getExel: MouseEventHandler = () => {
        if (fileDataURL) {
            const downloadLink = document.createElement('a');
            const fileName = new Date().toISOString().slice(0, 10);
            downloadLink.href = fileDataURL;
            downloadLink.download = `${fileName}.xlsx`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <>
            <img className={ css.icon } onClick={ getExel } src={ exel } alt='create_icon' />
        </>
    );
};

export {
    GetExelFile
};
