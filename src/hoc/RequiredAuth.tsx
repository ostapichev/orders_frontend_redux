import { FC, ReactElement } from 'react';
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks";


interface IProps {
    children: ReactElement;
}

const RequiredAuth: FC<IProps> = ({ children }) => {
    const { me } = useAppSelector(state => state.authReducer);
    if (me) {
        return children;
    }
    return <Navigate to='/login' />
};

export {
    RequiredAuth
};
