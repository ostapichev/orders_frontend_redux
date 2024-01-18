import { FC, MouseEventHandler } from 'react';

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
        <OverlayTrigger
            placement="top"
            overlay={ <Tooltip>Get exel file by orders</Tooltip> }
        >
            {({ ref, ...triggerHandler }) => (
                <Image
                    className={ css.icon }
                    ref={ ref }
                    src={ exel }
                    alt='exel_icon'
                    onClick={ getExel }
                    {...triggerHandler}
                />
            )}
        </OverlayTrigger>
    );
};

export {
    GetExelFile
};
