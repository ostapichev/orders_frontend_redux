import {ChangeEvent, FC, useEffect} from 'react';

import Form from "react-bootstrap/Form";

import {Group} from "../Group/Group";
import {orderActions, paramsActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './InputBlock.module.css';
import {useSearchParams} from "react-router-dom";

const InputBlock: FC = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {
        name, surname, email, phone, age, course, course_format, course_type,
        status, group, created_at_after, created_at_before
    } = useAppSelector(state => state.paramsReducer);
    const nameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setNameInputData(event.target.value));
    };
    const surNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setSurNameInputData(event.target.value));
    };
    const emailInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setEmailInputData(event.target.value));
    };
    const phoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setPhoneInputData(event.target.value));
    };
    const ageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setAgeInputData(event.target.value));
    };
    const courseInputChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(paramsActions.setCourseInputData(event.target.value));
    };
    const formatCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(paramsActions.setFormatInputData(event.target.value));
    };
    const typeCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(paramsActions.setTypeInputData(event.target.value));
    };
    const statusInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(paramsActions.setStatusInputData(event.target.value));
    };
    const groupInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(paramsActions.setGroupInputData(event.target.value));
    };
    const startDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setStartDateInputData(event.target.value.slice(0, 10)));
    };
    const endDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(paramsActions.setEndDateInputData(event.target.value.slice(0, 10)));
    };
    useEffect(() => {
        console.log('inputblock');
        if (query.get('group')) {
            dispatch(paramsActions.setGroupInputData(query.get('group')));
        }
        if (query.get('order_by')) {
            dispatch(paramsActions.setOrderByParams(query.get('order_by')));
        }
        if (query.get('page')) {
            dispatch(paramsActions.setPage(query.get('page')));
        }
    }, [dispatch, query]);

    return (
        <div className={css.input_container}>
            <div className={css.filter_order}>
                <Form.Control
                    type="search"
                    value={name}
                    size="sm"
                    placeholder="Name"
                    onChange={nameInputChange}
                />
                <Form.Control
                    type="search"
                    value={surname}
                    size="sm"
                    placeholder="Surname"
                    onChange={surNameInputChange}
                />
                <Form.Control
                    type="search"
                    value={email}
                    size="sm"
                    placeholder="email"
                    onChange={emailInputChange}
                />
                <Form.Control
                    type="search"
                    value={phone}
                    size="sm"
                    placeholder="phone"
                    onChange={phoneInputChange}
                />
                <Form.Control
                    type="number"
                    value={age}
                    size="sm"
                    placeholder="age"
                    onChange={ageInputChange}
                />
                <Form.Select
                    value={course}
                    size="sm"
                    aria-label="Choose course"
                    onChange={courseInputChange}
                >
                    <option value="">all courses</option>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JSCX">JSCX</option>
                    <option value="JCX">JCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                </Form.Select>
            </div>
            <div className={css.filter_order}>
                <Form.Select
                    value={course_format}
                    size="sm"
                    aria-label="Course_format"
                    onChange={formatCourseInputDataChange}>
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                </Form.Select>
                <Form.Select
                    value={course_type}
                    size="sm"
                    aria-label="Course_type"
                    onChange={typeCourseInputDataChange}>
                        <option value="">all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                </Form.Select>
                <Form.Select
                    value={status}
                    size="sm"
                    aria-label="Status"
                    onChange={statusInputDataChange}>
                        <option value="">all statuses</option>
                        <option value="new_order">new_order</option>
                        <option value="in_work">in_work</option>
                        <option value="agree">agree</option>
                        <option value="disagree">disagree</option>
                        <option value="dubbing">dubbing</option>
                </Form.Select>
                <Form.Select
                    value={query.get('group') || group}
                    size="sm"
                    aria-label="Choose group"
                    onChange={groupInputDataChange}>
                        <option value=''>all groups</option>
                        {
                            groups.map(group => <Group
                                key={group.id}
                                group={group}
                            />)
                        }
                </Form.Select>
                <Form.Control
                    type="date"
                    value={created_at_after}
                    size="sm"
                    placeholder="start date"
                    onChange={startDateInputChange}
                />
                <Form.Control
                    type="date"
                    value={created_at_before}
                    size="sm"
                    placeholder="end date"
                    onChange={endDateInputChange}
                />
            </div>
        </div>
    );
};

export {
    InputBlock
};
