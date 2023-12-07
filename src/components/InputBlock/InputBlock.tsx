import {ChangeEvent, FC} from 'react';

import Form from "react-bootstrap/Form";

import {Group} from "../Group/Group";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './InputBlock.module.css';


const InputBlock: FC = () => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {
        nameInputData,
        surNameInputData,
        emailInputData,
        phoneInputData,
        ageInputData,
        courseInputData,
        formatCourseInputData,
        typeCourseInputData,
        statusInputData,
        startDateInputData,
        endDateInputData} = useAppSelector(state => state.orderReducer);
    const nameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setNameInputData(event.target.value));
    };
    const surNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setSurNameInputData(event.target.value));
    };
    const emailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setEmailInputData(event.target.value));
    };
    const phoneInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setPhoneInputData(event.target.value));
    };
    const ageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setAgeInputData(event.target.value));
    };
    const courseInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setCourseInputData(event.target.value));
    };
    const formatCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setFormatInputData(event.target.value));
    };
    const typeCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setTypeInputData(event.target.value));
    };
    const statusInputDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setStatusInputData(event.target.value));
    };
    const groupInputDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setGroupInputData(event.target.value));
    };
    const startDateInputChange = (event: ChangeEvent<any>) => {
        console.log(startDateInputData);
        dispatch(orderActions.setStartDateInputData(event.target.value.slice(0, 10)));
    };
    const endDateInputChange = (event: ChangeEvent<any>) => {
        console.log(endDateInputData);
        dispatch(orderActions.setEndDateInputData(event.target.value.slice(0, 10)));
    };

    return (
        <div className={css.input_container}>
            <div className={css.filter_order}>
                <Form.Control value={nameInputData} size="sm" type="text" placeholder="Name" onChange={nameInputChange}/>
                <Form.Control value={surNameInputData} size="sm" type="text" placeholder="Surname" onChange={surNameInputChange}/>
                <Form.Control value={emailInputData} size="sm" type="email" placeholder="email" onChange={emailInputChange}/>
                <Form.Control value={phoneInputData} size="sm" type="text" placeholder="phone" onChange={phoneInputChange}/>
                <Form.Control value={ageInputData} size="sm" type="number" placeholder="age" onChange={ageInputChange}/>
                <Form.Select value={courseInputData} size="sm" aria-label="Choose course" onChange={courseInputChange}>
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
                <Form.Select value={formatCourseInputData} size="sm" name="course_format" aria-label="Course_format" onChange={formatCourseInputDataChange}>
                    <option value="">all formats</option>
                    <option value="static">static</option>
                    <option value="online">online</option>
                </Form.Select>
                <Form.Select value={typeCourseInputData} size="sm" name="course_type" aria-label="Course_type" onChange={typeCourseInputDataChange}>
                    <option value="">all types</option>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                </Form.Select>
                <Form.Select value={statusInputData} size="sm" name="status" aria-label="Status" onChange={statusInputDataChange}>
                    <option value="">all statuses</option>
                    <option value="new_order">new_order</option>
                    <option value="in_work">in_work</option>
                    <option value="agree">agree</option>
                    <option value="disagree">disagree</option>
                    <option value="dubbing">dubbing</option>
                </Form.Select>
                <Form.Select size="sm" name="group" aria-label="Choose group" onChange={groupInputDataChange}>
                    <option value={''}>all groups</option>
                    {groups.map(group => <Group key={group.id} group={group}/>)}
                </Form.Select>
                <Form.Control size="sm" type="datetime-local" placeholder="start date" onChange={startDateInputChange}/>
                <Form.Control size="sm" type="datetime-local" placeholder="end date" onChange={endDateInputChange}/>
            </div>
        </div>
    );
};

export {
    InputBlock
};
