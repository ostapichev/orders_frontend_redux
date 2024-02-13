import {FC} from 'react';

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {IFuncVoid} from "../../types";
import {IParams} from "../../interfaces";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import {exel} from "../../assets";

const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const {
        order_by, name, surname, email, phone, age, course,
        course_format, course_type, status, group, created_at_after, created_at_before, manager
    } = useAppSelector(state => state.paramsReducer);
    const params: IParams = {
        order_by, name, surname, email, phone, age, course,
        course_format, course_type, status, group, created_at_after, created_at_before, manager
    };
    const getFile: IFuncVoid = async () => {
        await dispatch(orderActions.getExelFile({ params }));
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
