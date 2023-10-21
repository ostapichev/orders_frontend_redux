import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";

import {IOrder} from "../../interfaces";
import {orderActions} from "../../redux";
import {Groups} from "../Groups/Groups";
import {GroupOption} from "../GroupsOption/GroupOption";
import {GroupSelect} from "../GroupSelect/GroupSelect";

const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const {groups} = useAppSelector(state => state.groupReducer);
    const {orderUpdate} = useAppSelector(state => state.orderReducer);
    const {reset, handleSubmit, register, setValue} = useForm<IOrder>();
    const update: SubmitHandler<IOrder> = async (order) => {
        dispatch(orderActions.update({id: orderUpdate.id, order}));
        reset();
    };
    useEffect(() => {
        if (orderUpdate) {
            setValue('name', orderUpdate.name);
            setValue('surname', orderUpdate.surname);
            setValue('email', orderUpdate.email);
            setValue('phone', orderUpdate.phone);
            setValue('age', orderUpdate.age);
            setValue('sum', orderUpdate.sum);
            setValue('already_paid', orderUpdate.already_paid);
        }
    }, [orderUpdate, setValue]);

    return (
        <div>
            <form onSubmit={handleSubmit(update)}>
                <input type="text" placeholder={'name'}{...register('name')}/>
                <input type="text" placeholder={'surname'}{...register('surname')}/>
                <input type="text" placeholder={'email'}{...register('email')}/>
                <input type="text" placeholder={'phone'}{...register('phone')}/>
                <input type="text" placeholder={'age'}{...register('age')}/>
                <input type="text" placeholder={'sum'}{...register('sum')}/>
                <input type="text" placeholder={'already_paid'}{...register('already_paid')}/>
                <label htmlFor="course">Choose course</label>
                <select name="course" {...register('course')}>
                    <option value="FS">FS</option>
                    <option value="QASX">QASX</option>
                    <option value="JCX">JSCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                </select>
                <label htmlFor="course format">Choose course format</label>
                <select name="course_format" {...register('course_format')}>
                    <option value="static">static</option>
                    <option value="online">online</option>
                </select>
                <label htmlFor="course type">Choose course type</label>
                <select name="course_type" {...register('course_type')}>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                </select>
                <label htmlFor="status">Choose status</label>
                <select name="status" {...register('status')}>
                    <option value="in work">in work</option>
                    <option value="new">new</option>
                    <option value="agree">agree</option>
                    <option value="disagree">disagree</option>
                    <option value="dubbing">dubbing</option>
                </select>
                <label htmlFor="status">Choose group</label>
                <GroupOption/>
                <button>update</button>
            </form>
        </div>
    );
};

export {
    OrderForm
};
