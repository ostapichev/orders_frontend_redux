import {FC} from 'react';
import {useSearchParams} from "react-router-dom";

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {IFuncVoid} from "../../types";
import {IParams} from "../../interfaces";
import {orderActions} from "../../redux";
import {useAppDispatch} from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import {exel} from "../../asserts";


const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const order_by: string = query.get('order_by');
    const name_contains: string = query.get('name');
    const surname_contains: string = query.get('surname');
    const email_contains: string = query.get('email');
    const phone_contains: string = query.get('phone');
    const age_in: string = query.get('age');
    const course: string = query.get('course');
    const course_format: string = query.get('course_format');
    const course_type: string = query.get('course_type');
    const status_in: string = query.get('status');
    const group: string = query.get('group');
    const created_at_after: string = query.get('start_date');
    const created_at_before: string = query.get('end_date');
    const manager: string = query.get('manager');
    const params: IParams = {
        order_by, name_contains, surname_contains, email_contains, phone_contains, age_in,
        course, course_format, course_type, status_in, group, created_at_after, created_at_before, manager
    };
    const getFile: IFuncVoid = () => {
        dispatch(orderActions.getExelFile({params}));
    }

    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Get exel file by orders</Tooltip>}
        >
            {({ref, ...triggerHandler}) => (
                <Image
                    className={css.icon}
                    ref={ref}
                    src={exel}
                    alt='exel_icon'
                    onClick={getFile}
                    {...triggerHandler}
                />
            )}
        </OverlayTrigger>
    );
};

export {
    GetExelFile
};
