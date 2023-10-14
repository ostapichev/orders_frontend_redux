import {FC} from 'react';
import {useSelector} from "react-redux";

import {IOrderState} from "../../interfaces";
import {useSearchParams} from "react-router-dom";


const Pagination: FC = () => {
    const {prevPage, nextPage} = useSelector((state: {orders: IOrderState}) => state.orders);
    const [, setQuery] = useSearchParams();
    const prev = () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = () => {
        setQuery(next => ({...next, page: +next.get('page')+1}));
    };
    return (
        <div>
            <button disabled={!prevPage} onClick={prev}>prev</button>
            <button disabled={!nextPage} onClick={next}>next</button>
        </div>
    );
};

export  {
    Pagination
};
