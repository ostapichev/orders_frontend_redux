import { FC } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import Form from 'react-bootstrap/Form';

import { groupActions } from "../../redux";
import { groupValidator } from "../../validators";
import { IFuncVoid } from "../../types";
import { IGroup } from "../../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAppDispatch } from "../../hooks";

import css from './GroupForm.module.css';
import { form_css } from '../../styles';


const GroupForm: FC = () => {
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<IGroup>({
        mode: 'all',
        resolver: joiResolver(groupValidator)
    });
    const dispatch = useAppDispatch();
    const save: SubmitHandler<IGroup> = async (group) => {
        await dispatch(groupActions.create({ group }));
        reset();
    };
    const select: IFuncVoid = () => {
        dispatch(groupActions.setVision());
    };

    return (
        <Form onSubmit={ handleSubmit(save) }>
            <label htmlFor='group'>Create new group</label>
            <Form.Control
                size="sm"
                name='group'
                placeholder='enter name group'
                { ...register('name') } />
            <div>
                <button
                    type="submit"
                    className={ css.btn_group }
                    disabled={ !isValid }
                >
                    save
                </button>
                <button
                    type="button"
                    className={ css.btn_group }
                    onClick={ select }
                >
                    select
                </button>
            </div>
            { errors.name && <div className={ form_css.err_text }>{ errors.name.message }</div> }
        </Form>
    );
};

export {
    GroupForm
};
