import {FC, useEffect, useRef} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {Group} from "../Group/Group";
import {groupActions} from "../../redux";
import {useSearchParams} from "react-router-dom";


const Groups: FC = () => {
    const {groups, trigger} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: '1' }));
    }, []);
    useEffect(() => {
        dispatch(groupActions.getAll({page: query.get('page')}));
    }, [dispatch, query, trigger]);

    return (
        <div>
            {
                groups.map(group => <Group key={group.id} group={group}/>)
            }
        </div>
    );
};

export {
    Groups
};
