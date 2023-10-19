import {FC, useEffect} from 'react';
import {userActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";


const UserPagination: FC = () => {
    const {loading, totalPages} = useAppSelector(state => state.userReducer);
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
        dispatch(userActions.getTotalPages());
    }, [dispatch]);

    return (
        <div>
            <button disabled={loading || currentPage === 1} onClick={prev}>prev</button>
            <button disabled={loading || currentPage === totalPages} onClick={next}>next</button>
        </div>
    );
};

export  {
    UserPagination
};
