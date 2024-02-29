import {ChangeEvent, FC} from 'react';

import Form from "react-bootstrap/Form";

import {Group} from "../Group/Group";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './InputBlock.module.css';

const InputBlock: FC = () => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {params} = useAppSelector(state => state.orderReducer);
    const nameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setNameInputData(event.target.value));
    };
    const surNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setSurNameInputData(event.target.value));
    };
    const emailInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setEmailInputData(event.target.value));
    };
    const phoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPhoneInputData(event.target.value));
    };
    const ageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setAgeInputData(event.target.value));
    };
    const courseInputChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setCourseInputData(event.target.value));
    };
    const formatCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setFormatInputData(event.target.value));
    };
    const typeCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setTypeInputData(event.target.value));
    };
    const statusInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setStatusInputData(event.target.value));
    };
    const groupInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setGroupInputData(event.target.value));
    };
    const startDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setStartDateInputData(event.target.value.slice(0, 10)));
    };
    const endDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setEndDateInputData(event.target.value.slice(0, 10)));
    };

    return (
        <div className={css.input_container}>
            <div className={css.filter_order}>
                <Form.Control
                    type="search"
                    value={params.name || ''}
                    size="sm"
                    placeholder="Name"
                    onChange={nameInputChange}
                />
                <Form.Control
                    type="search"
                    value={params.surname || ''}
                    size="sm"
                    placeholder="Surname"
                    onChange={surNameInputChange}
                />
                <Form.Control
                    type="search"
                    value={params.email || ''}
                    size="sm"
                    placeholder="email"
                    onChange={emailInputChange}
                />
                <Form.Control
                    type="search"
                    value={params.phone || ''}
                    size="sm"
                    placeholder="phone"
                    onChange={phoneInputChange}
                />
                <Form.Control
                    type="number"
                    value={params.age || ''}
                    size="sm"
                    placeholder="age"
                    onChange={ageInputChange}
                />
                <Form.Select
                    value={params.course || ''}
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
                    value={params.course_format || ''}
                    size="sm"
                    aria-label="Course_format"
                    onChange={formatCourseInputDataChange}>
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                </Form.Select>
                <Form.Select
                    value={params.course_type || ''}
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
                    value={params.status || ''}
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
                    value={params.group || ''}
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
                    value={params.created_at_after || ''}
                    size="sm"
                    placeholder="start date"
                    onChange={startDateInputChange}
                />
                <Form.Control
                    type="date"
                    value={params.created_at_before || ''}
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
