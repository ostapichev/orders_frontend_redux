import {FC} from 'react';

import {useAppSelector} from "../../hooks";
import {UserForm, Users} from "../../components";
import {useNavigate} from "react-router-dom";
import {UserPagination} from "../../components/UserPagination/UserPagination";


const AdminPage: FC = () => {
    const {errors} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/orders')}>Go to site</button>
            <UserForm/>
            {errors?.name && <p>{errors.name}</p>}
            {errors?.surname && <p>{errors.name}</p>}
            {errors?.email && <p>{errors.email}</p>}
            <Users/>
            <UserPagination/>
        </div>
    );
};

export {
    AdminPage
};
