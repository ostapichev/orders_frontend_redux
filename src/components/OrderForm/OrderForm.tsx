import { ChangeEvent, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from 'react-bootstrap/Form';

import { IOrder } from "../../interfaces";
import { IFuncVoid } from "../../types";
import { groupActions, orderActions } from "../../redux";
import { Group } from "../Group/Group";
import { GroupForm } from "../GroupForm/GroupForm";
import { joiResolver } from "@hookform/resolvers/joi";
import { orderValidator } from "../../validators";

import { button_css, form_css } from '../../styles/index';
import css from './OrderForm.module.css';


const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const { groups, trigger, vision } = useAppSelector(state => state.groupReducer);
    const { orderUpdate, errorsOrder, orderCreate, openOrderForm } = useAppSelector(state => state.orderReducer);
    const { reset, handleSubmit, register, setValue, formState: { errors, isValid } } = useForm<IOrder>({
        mode: "all",
        resolver: joiResolver(orderValidator)
    });
    const update: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.update({ id: orderUpdate.id, order }));
        reset();
    };
    const save: SubmitHandler<IOrder> = async (order) => {
        await dispatch(orderActions.create({ groupId: orderCreate, order }));
        reset();
    };
    const addGroup: IFuncVoid = () => {
        dispatch(groupActions.setVision());
    };
    const handleClose: IFuncVoid = () => {
        dispatch(orderActions.closeForm());
        dispatch(groupActions.setVisionDefault());
        reset();
    };
    const handleGroup = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(orderActions.setOrderCreate(event.target.value));
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
        <div className={ `${ form_css.modal_form } ${ openOrderForm ? css.order_form : 'd-none' }` }>
            <h3 className={ css.order_form_header }>{ orderUpdate ? 'Update' : 'Create' } order</h3>
            {vision &&
                <div className={ css.group_form }>
                    <GroupForm />
                </div>
            }
            <Form className={ css.order_form_container } onSubmit={ handleSubmit(orderUpdate ? update : save) }>
                <div className={ css.form_block_left }>
                    <div className={ vision ? 'd-none' : 'd-flex flex-column' }>
                        <label htmlFor="group">Group</label>
                        <Form.Select
                            size="sm"
                            aria-label="Group"
                            name="group"
                            { ...register('group') }
                            onChange={ handleGroup }
                        >
                            <option>Choose group</option>
                            {
                                groups.map(group => <Group
                                    key={ group.id }
                                    group={ group }
                                />)
                            }
                        </Form.Select>
                        <button className={ css.btn_group } onClick={ addGroup }>Add group</button>
                        { errors.group && <div className={ form_css.err_text }>{ errors.group.message }</div>}
                        { errorsOrder?.group && <div className={ form_css.err_text }>{ errorsOrder.group }</div> }
                    </div>
                    <label htmlFor="name">First name</label>
                    <Form.Control
                        size="sm"
                        name="name"
                        placeholder='enter name'
                        { ...register('name') }
                    />
                    { errors.name && <div className={ form_css.err_text }>{ errors.name.message }</div>}
                    <label htmlFor="surname">Surname</label>
                    <Form.Control
                        size="sm"
                        name="surname"
                        placeholder='enter surname'
                        { ...register('surname') }
                    />
                    { errors.surname && <div className={ form_css.err_text }>{ errors.surname.message }</div> }
                    <label htmlFor="email">Email</label>
                    <Form.Control
                        size="sm"
                        type="email"
                        name="email"
                        placeholder='enter email'
                        { ...register('email') }
                    />
                    { errors.surname && <div className={ form_css.err_text }>{ errors.surname.message }</div> }
                    <label htmlFor="phone">Phone</label>
                    <Form.Control
                        size="sm"
                        type="text"
                        name="phone"
                        placeholder='enter phone'
                        { ...register('phone') }
                    />
                    { errors.surname && <div className={ form_css.err_text }>{ errors.surname.message }</div> }
                    <label htmlFor="age">Age</label>
                    <Form.Control
                        size="sm"
                        type="number"
                        name="age"
                        placeholder='enter age'
                        { ...register('age') }/>
                    { errors.age && <div className={ form_css.err_text }>{ errors.age.message }</div> }
                </div>
                <div className={ vision ? css.form_block_right_top : css.form_block_right }>
                    <label htmlFor="course">Choose course</label>
                    <Form.Select
                        size="sm"
                        name="course"
                        aria-label="Choose_course"
                        { ...register('course') }
                    >
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="JCX">JCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </Form.Select>
                    { errors.course && <div className={ form_css.err_text }>{ errors.course.message }</div>}
                    <label className={css.input_paid} htmlFor="paid">Already paid</label>
                    <Form.Control
                        size="sm"
                        type="number"
                        name="paid"
                        placeholder='already_paid'
                        { ...register('already_paid') }
                    />
                    { errors.already_paid &&
                        <div className={ form_css.err_text }>
                            { errors.already_paid.message }
                        </div>
                    }
                    <label htmlFor="sum">Sum</label>
                    <Form.Control
                        size="sm"
                        type="number"
                        name="sum"
                        placeholder='sum'
                        { ...register('sum') }
                    />
                    { errors.sum && <div className={ form_css.err_text }>{ errors.sum.message }</div> }
                    <label htmlFor="course_format">Choose course format</label>
                    <Form.Select
                        size="sm"
                        name="course_format"
                        aria-label="Default select example"
                        { ...register('course_format') }
                    >
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </Form.Select>
                    { errors.course_format &&
                        <div className={ form_css.err_text }>
                            { errors.course_format.message }
                        </div>
                    }
                    <label htmlFor="course_type">Choose course type</label>
                    <Form.Select
                        size="sm"
                        aria-label="Course_type"
                        name="course_type"
                        { ...register('course_type') }
                    >
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </Form.Select>
                    { errors.course_type && <div className={ form_css.err_text }>{ errors.course_type.message }</div> }
                    <label htmlFor="status">Choose status</label>
                    <Form.Select
                        size="sm"
                        aria-label="Status"
                        name="status"
                        { ...register('status') }
                    >
                        <option value="new_order">new_order</option>
                        <option value="in_work">in_work</option>
                        <option value="agree">agree</option>
                        <option value="disagree">disagree</option>
                        <option value="dubbing">dubbing</option>
                    </Form.Select>
                    { errors.status && <div className={ form_css.err_text }>{ errors.status.message }</div> }
                </div>
                    { errorsOrder?.name && <div className={ form_css.err_text }>{ errorsOrder.name }</div> }
                    { errorsOrder?.surname && <div className={ form_css.err_text }>{ errorsOrder.name }</div> }
                    { errorsOrder?.email && <div className={ form_css.err_text }>{ errorsOrder.email }</div> }
                    { errorsOrder?.phone && <div className={ form_css.err_text }>{ errorsOrder.phone }</div> }

                <div className={ css.button_block }>
                    <button className={ button_css.btn_form } disabled={ !isValid }>
                        { orderUpdate ? 'Update' : 'Save' }
                    </button>
                    <button className={ button_css.btn_form } onClick={ handleClose }>Close</button>
                </div>
            </Form>
        </div>
    );
};

export {
    OrderForm
};
