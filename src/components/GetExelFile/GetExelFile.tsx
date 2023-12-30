import {FC, MouseEventHandler, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {IParams} from "../../interfaces";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import {exel} from "../../asserts";


const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const {fileDataURL} = useAppSelector(state => state.orderReducer);
    const [query] = useSearchParams();
    const getExel: MouseEventHandler = () => {
        console.log(fileDataURL);
        if (fileDataURL) {
            const downloadLink = document.createElement('a');
            console.log(downloadLink);
            downloadLink.href = fileDataURL;
            downloadLink.download = 'orders_data.xlsx';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };
    useEffect(() => {
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
        dispatch(orderActions.getExelFile({params}));
    }, [dispatch, query]);

    return (
        <>
            <img className={css.icon} onClick={getExel} src={exel} alt='create_icon'/>
        </>
    );
};

export {
    GetExelFile
};
