import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {groupActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


const GroupsPagination: FC = () => {
    const {loading, totalPages} = useAppSelector(state => state.groupReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const currentPage = +query.get('page');
    const prev = () => {
        if (currentPage > 1) {
            setQuery(prev => ({...prev, page: +prev.get('page')-1}));
        }
    };
    const next = async () => {
        if (currentPage < totalPages) {
            setQuery(next => ({...next, page: +next.get('page')+1}));
        }
    };

    useEffect(() => {
        dispatch(groupActions.getTotalPages());
    }, [dispatch]);

    return (
        <div>
            <button disabled={loading || currentPage === 1} onClick={prev}>prev</button>
            <button disabled={loading || currentPage === totalPages} onClick={next}>next</button>
        </div>
    );
};

export  {
    GroupsPagination
};
