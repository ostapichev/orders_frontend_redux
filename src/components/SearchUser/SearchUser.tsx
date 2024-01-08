import React, {ChangeEvent, FC, useState} from 'react';

import {useForm} from "react-hook-form";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {useAppDispatch, useAppSelector} from "../../hooks";
import css from "./SearchUser.module.css";
import {adminActions} from "../../redux";



const SearchUser: FC = () => {
    const dispatch = useAppDispatch();
    const {reset, formState: {isValid}} = useForm();
    const {surnameUserInput} = useAppSelector(state => state.adminReducer);
    const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(adminActions.setSearchUser(event.target.value));
    };
    const searchUser = () => {
        dispatch(adminActions.searchUser());
    };

    return (
        <InputGroup className="mb-3 w-50">
            <Form.Control
                value={surnameUserInput}
                onChange={changeInput}
                type="search"
                placeholder="Search user"
                aria-label="Search user"
                aria-describedby="basic-addon2"
            />
            <Button
                onClick={() => searchUser()}
                variant="primary"
            >
                    Search
            </Button>
        </InputGroup>
    );
};

export {
    SearchUser
};
