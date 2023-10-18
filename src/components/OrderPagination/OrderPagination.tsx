import {FC} from 'react';

import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";


const OrderPagination: FC = () => {
    const {prevPage, nextPage} = useAppSelector((state) => state.orderReducer);
    const [, setQuery] = useSearchParams();
    const prev = async () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = async () => {
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
    OrderPagination
};
