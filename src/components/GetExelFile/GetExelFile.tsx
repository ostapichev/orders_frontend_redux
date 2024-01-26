import { FC } from 'react';
import { useSearchParams } from "react-router-dom";

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { IFuncVoid } from "../../types";
import { IParams } from "../../interfaces";
import { orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import { exel } from "../../asserts";



const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const { searchParams } = useAppSelector(state => state.orderReducer);
    const queryParams = [
        'order_by', 'name', 'surname', 'email', 'phone', 'age', 'course', 'course_format',
        'course_type', 'status', 'group', 'start_date', 'end_date', 'manager'
    ];
    const params: IParams = {};
    queryParams.forEach((param) => {
        const value = query.get(param);
        params[param] = value !== null ? value : '';
    });
    const resultParams: IParams = { ...searchParams, ...params };
    const getFile: IFuncVoid = () => {
        dispatch(orderActions.setSearchParams(resultParams));
        dispatch(orderActions.getExelFile({ params: resultParams }));
    }

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
                    onClick={ getFile }
                    { ...triggerHandler }
                />
            )}
        </OverlayTrigger>
    );
};

export {
    GetExelFile
};
