import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";

import Form from 'react-bootstrap/Form';

import {IOrder} from "../../interfaces";
import {groupActions, orderActions} from "../../redux";
import {Group} from "../Group/Group";
import {joiResolver} from "@hookform/resolvers/joi";
import {orderValidator} from "../../validators";

import css from './OrderForm.module.css';
import css_btn from "../UserForm/UserForm.module.css";


const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const {orderUpdate, errorsOrder, orderCreate, openOrderForm} = useAppSelector(state => state.orderReducer);
    const {reset, handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IOrder>({
        mode: "onSubmit",
        resolver: joiResolver(orderValidator)
    });
    const update: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.update({id: orderUpdate.id, order}));
        reset();
    };
    const save: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.create({order, groupId: orderCreate}));
        reset();
    };
    const handleClose = () => {
        dispatch(orderActions.closeForm());
        reset();
    };
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch, trigger]);
    useEffect(() => {
        if (orderUpdate) {
            setValue('name', orderUpdate.name);
            setValue('surname', orderUpdate.surname);
            setValue('email', orderUpdate.email);
            setValue('phone', orderUpdate.phone);
            setValue('age', orderUpdate.age);
            setValue('sum', orderUpdate.sum);
            setValue('already_paid', orderUpdate.already_paid);
            setValue('course', orderUpdate.course);
            setValue('course_format', orderUpdate.course_format);
            setValue('course_type', orderUpdate.course_type);
            setValue('status', orderUpdate.status);
            setValue('group', orderUpdate.group);
        }
    }, [orderUpdate, setValue]);

    return (
        <div className={`${css.order_form} ${openOrderForm ? css.open_order_form : css.close_order_form }`}>
            <h3 className={css.order_form_header}>{orderUpdate ? 'Update' : 'Create'} order</h3>
            <form className={css.order_form_container} onSubmit={handleSubmit(orderUpdate ? update : save)}>
                <div className={css.form_block_left}>
                    <label htmlFor="name">First name</label>
                    <Form.Control size="sm" name="name" placeholder={'enter name'} {...register('name')}/>
                        {errors.name && <div className={css.error_form}>{errors.name.message}</div>}
                    <label htmlFor="surname">Surname</label>
                    <Form.Control size="sm" name="surname" placeholder={'enter surname'} {...register('surname')}/>
                        {errors.surname && <div className={css.error_form}>{errors.surname.message}</div>}
                    <label htmlFor="email">Email</label>
                    <Form.Control size="sm" type="email" name="email" placeholder={'enter email'} {...register('email')}/>
                        {errors.email && <div className={css.error_form}>{errors.email.message}</div>}
                    <label htmlFor="phone">Phone</label>
                    <Form.Control size="sm" type="number" name="phone" placeholder={'enter phone'} {...register('phone')}/>
                        {errors.phone && <div className={css.error_form}>{errors.phone.message}</div>}
                    <label htmlFor="age">Age</label>
                    <Form.Control size="sm" type="number" name="age" placeholder={'enter age'} {...register('age')}/>
                        {errors.age && <div className={css.error_form}>{errors.age.message}</div>}
                    <label htmlFor="course">Choose course</label>
                    <Form.Select size="sm" name="course" aria-label="Choose_course" {...register('course')}>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JSCX</option>
                        <option value="JCX">JCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </Form.Select>
                    {errors.course && <div className={css.error_form}>{errors.course.message}</div>}
                </div>
                <div className={css.form_block_right}>
                    <label htmlFor="paid">Already paid</label>
                    <Form.Control size="sm" type="number" name="paid" placeholder={'already_paid'} {...register('already_paid')}/>
                        {errors.already_paid && <div className={css.error_form}>{errors.already_paid.message}</div>}
                    <label htmlFor="sum">Sum</label>
                    <Form.Control size="sm" type="number" name="sum" placeholder={'sum'} {...register('sum')}/>
                        {errors.sum && <div className={css.error_form}>{errors.sum.message}</div>}
                    <label htmlFor="course_format">Choose course format</label>
                    <Form.Select size="sm" name="course_format" aria-label="Default select example" {...register('course_format')}>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </Form.Select>
                        {errors.course_format && <p>{errors.course_format.message}</p>}
                    <label htmlFor="course_type">Choose course type</label>
                    <Form.Select size="sm" aria-label="Course_type" name="course_type" {...register('course_type')}>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </Form.Select>
                        {errors.course_type && <p>{errors.course_type.message}</p>}
                    <label htmlFor="status">Choose status</label>
                    <Form.Select size="sm" aria-label="Status" name="status" {...register('status')}>
                        <option value="new_order">new_order</option>
                        <option value="in_work">in_work</option>
                        <option value="agree">agree</option>
                        <option value="disagree">disagree</option>
                        <option value="dubbing">dubbing</option>
                    </Form.Select>
                        {errors.status && <p>{errors.status.message}</p>}
                    <label htmlFor="group">Choose group</label>
                    <Form.Select size="sm" aria-label="Choose group" name="group" {...register('group')}
                            onChange={event => dispatch(orderActions.setOrderCreate(event.target.value))}>
                            <option>all groups</option>
                            {
                                groups.map(group => <Group key={group.id} group={group}/>)
                            }
                    </Form.Select>
                        {errors.group && <p>{errors.group.message}</p>}
                </div>
                    {errorsOrder?.name && <p>{errorsOrder.name}</p>}
                    {errorsOrder?.surname && <p>{errorsOrder.name}</p>}
                    {errorsOrder?.email && <p>{errorsOrder.email}</p>}
                    {errorsOrder?.phone && <p>{errorsOrder.phone}</p>}
                <div className={css.button_block}>
                    <button className={css_btn.btn_user_form} disabled={!isValid}>{orderUpdate ? 'Update' : 'Save'}</button>
                    <button className={css_btn.btn_user_form} onClick={handleClose}>Close</button>
                </div>
            </form>
        </div>
    );
};

export {
    OrderForm
};
