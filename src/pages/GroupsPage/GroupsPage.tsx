import {FC} from 'react';
import {Link} from "react-router-dom";

import {GroupForm, Groups, GroupsPagination, Loading} from "../../components";
import {useAppSelector} from "../../hooks";


const GroupsPage: FC = () => {
    const {loading} = useAppSelector(state => state.groupReducer);

    return (
        <div>
            groupPage
        </div>
    );
};

export {
    GroupsPage
};

