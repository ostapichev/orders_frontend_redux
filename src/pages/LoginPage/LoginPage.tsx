import {FC} from 'react';
import {useSearchParams} from "react-router-dom";

import {LoginForm} from "../../components";
import {useAppSelector} from "../../hooks";


const LoginPage: FC = () => {
    const {error} = useAppSelector(state => state.authReducer)
    const [query,] = useSearchParams();

    return (
        <div>
            {
                query.get('expSession') && <p>Please login!</p>
            }
            <LoginForm/>
            {error?.detail && <p>{error.detail}</p>}
        </div>
    );
};

export {
    LoginPage
};
