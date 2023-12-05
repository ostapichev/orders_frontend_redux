import {ChangeEvent, FC} from 'react';

import Form from "react-bootstrap/Form";

import {Group} from "../Group/Group";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './InputBlock.module.css';


const InputBlock: FC = () => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {nameInputData, surNameInputData, emailInputData} = useAppSelector(state => state.orderReducer);
    const nameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setNameInputData(event.target.value));
    };
    const surNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setSurNameInputData(event.target.value));
    };
    const emailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(orderActions.setEmailInputData(event.target.value));
    };

    return (
        <div className={css.input_container}>
            <div className={css.filter_order}>
                <Form.Control value={nameInputData} size="sm" type="text" placeholder="Name" onChange={nameInputChange}/>
                <Form.Control value={surNameInputData} size="sm" type="text" placeholder="Surname" onChange={surNameInputChange}/>
                <Form.Control value={emailInputData} size="sm" type="email" placeholder="email" onChange={emailInputChange}/>
                <Form.Control size="sm" type="text" placeholder="phone"/>
                <Form.Control size="sm" type="number" placeholder="age"/>
                <Form.Select size="sm" aria-label="Choose course">
                    <option>all courses</option>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JCX">JSCX</option>
                    <option value="JCX">JCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                </Form.Select>
            </div>
            <div className={css.filter_order}>
                <Form.Select size="sm" name="course_format" aria-label="Course_format">
                    <option>all formats</option>
                    <option value="static">static</option>
                    <option value="online">online</option>
                </Form.Select>
                <Form.Select size="sm" name="course_type" aria-label="Course_type">
                    <option>all types</option>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                </Form.Select>
                <Form.Select size="sm" name="status" aria-label="Status">
                    <option>all statuses</option>
                    <option value="new_order">new_order</option>
                    <option value="in_work">in_work</option>
                    <option value="agree">agree</option>
                    <option value="disagree">disagree</option>
                    <option value="dubbing">dubbing</option>
                </Form.Select>
                <Form.Select size="sm" name="group" aria-label="Choose group"
                             onChange={(event) => dispatch(orderActions.setOrderCreate(event.target.value))}>
                    <option>all groups</option>
                    {groups.map(group => <Group key={group.id} group={group}/>)}
                </Form.Select>
                <Form.Control size="sm" type="datetime-local" placeholder="start date"/>
                <Form.Control size="sm" type="datetime-local" placeholder="end date"/>
            </div>
        </div>
    );
};

export {
    InputBlock
};
