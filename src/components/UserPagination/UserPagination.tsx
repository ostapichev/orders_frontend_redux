import {FC, useEffect, useState} from 'react';

import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {userService} from "../../services";
import {IPagination, IUser} from "../../interfaces";


const UserPagination: FC = () => {
    const {loading} = useAppSelector(state => state.userReducer);
    const [query, setQuery] = useSearchParams();
    const currentPage = +query.get('page');
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const totalPages = async () => {
            try {
                const {data} = await userService.getTotalPages();
                setTotalPages(data.total_pages);
            } catch (err) {
                console.error(err);
            }
        };
        totalPages();
    }, []);

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