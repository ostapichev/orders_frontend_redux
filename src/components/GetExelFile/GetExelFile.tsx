import { FC } from 'react';
import {useAppDispatch} from "../../hooks";
import {orderActions} from "../../redux";
import {useSearchParams} from "react-router-dom";

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { IParams } from "../../interfaces";

import css from '../MyBlockButton/MyBlockButton.module.css';

import { exel } from "../../asserts";


const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const getFile = () => {
        const params: IParams = {};
        params.page = query.get('page');
        params.order_by = query.get('order_by');
        params.name_contains = query.get('name');
        params.surname_contains = query.get('surname');
        params.email_contains = query.get('email');
        params.phone_contains = query.get('phone');
        params.age_in = query.get('age');
        params.course = query.get('course');
        params.course_format = query.get('course_format');
        params.course_type = query.get('course_type');
        params.status_in = query.get('status');
        params.group = query.get('group');
        params.created_at_after = query.get('start_date');
        params.created_at_before = query.get('end_date');
        params.manager = query.get('manager');
        dispatch(orderActions.getExelFile({ params }))
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
