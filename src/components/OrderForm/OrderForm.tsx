import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";

import {IOrder} from "../../interfaces";
import {groupActions, orderActions} from "../../redux";
import {Group} from "../Group/Group";
import {joiResolver} from "@hookform/resolvers/joi";
import {orderValidator} from "../../validators";


const OrderForm: FC = () => {
    const dispatch = useAppDispatch();
    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const {orderUpdate, orderCreate, me} = useAppSelector(state => state.orderReducer);
    const {reset, handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IOrder>({
        mode: "all",
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
            setValue('me', me);
        }
    }, [orderUpdate, setValue, me]);

    return (
        <div>
            <h3>Create or update order</h3>
            <form onSubmit={handleSubmit(orderUpdate ? update : save)}>
                <input type="text" placeholder={'name'}{...register('name')}/>
                    {errors.name && <p>{errors.name.message}</p>}
                <input type="text" placeholder={'surname'}{...register('surname')}/>
                    {errors.surname && <p>{errors.surname.message}</p>}
                <input type="text" placeholder={'email'}{...register('email')}/>
                    {errors.email && <p>{errors.email.message}</p>}
                <input type="text" placeholder={'phone'}{...register('phone')}/>
                    {errors.phone && <p>{errors.phone.message}</p>}
                <input type="text" placeholder={'age'}{...register('age')}/>
                    {errors.age && <p>{errors.age.message}</p>}
                <input type="text" placeholder={'sum'}{...register('sum')}/>
                    {errors.sum && <p>{errors.sum.message}</p>}
                <input type="text" placeholder={'already_paid'}{...register('already_paid')}/>
                    {errors.already_paid && <p>{errors.already_paid.message}</p>}
                <label htmlFor="course">Choose course</label>
                <select name="course" {...register('course')}>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JCX">JSCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                </select>
                    {errors.course && <p>{errors.course.message}</p>}
                <label htmlFor="course_format">Choose course format</label>
                <select name="course_format" {...register('course_format')}>
                    <option value="static">static</option>
                    <option value="online">online</option>
                </select>
                    {errors.course_format && <p>{errors.course_format.message}</p>}
                <label htmlFor="course_type">Choose course type</label>
                <select name="course_type" {...register('course_type')}>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                </select>
                    {errors.course_type && <p>{errors.course_type.message}</p>}
                <label htmlFor="status">Choose status</label>
                <select name="status" {...register('status')}>
                    <option value="new">new</option>
                    <option value="in work">in work</option>
                    <option value="agree">agree</option>
                    <option value="disagree">disagree</option>
                    <option value="dubbing">dubbing</option>
                </select>
                    {errors.status && <p>{errors.status.message}</p>}
                <label htmlFor="group">Choose group</label>
                <select name="group" {...register("group")}
                        onChange={(event) => dispatch(orderActions.setOrderCreate(event.target.value))}>
                        {
                            groups.map(group => <Group key={group.id} group={group}/>)
                        }
                </select>
                    {errors.group && <p>{errors.group.message}</p>}
                <button disabled={!isValid}>{orderUpdate? 'Update' : 'Save'}</button>
            </form>
            <hr/>
        </div>
    );
};

export {
    OrderForm
};
