import {FC} from 'react';
import {useSearchParams} from "react-router-dom";

import {LoginForm} from "../../components";


const LoginPage: FC = () => {
    const [query,] = useSearchParams();

    return (
        <div>
            {
                query.get('expSession') && <p>Session expired. Please login!</p>
            }
            <LoginForm/>
        </div>
    );
};

export {
    LoginPage
};
