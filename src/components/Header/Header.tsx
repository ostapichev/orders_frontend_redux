import {FC} from 'react';
import {NavLink} from "react-router-dom";

const Header: FC = () => {
    return (
        <div>
            <h1>Logo</h1>
            <ul>
                <li>
                    <NavLink to={'login'}>Login</NavLink>
                </li>
            </ul>
        </div>
    );
};

export {
    Header
};
