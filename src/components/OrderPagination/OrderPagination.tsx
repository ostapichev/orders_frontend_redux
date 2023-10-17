import {FC} from 'react';

import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";


const OrderPagination: FC = () => {
    const {prevPage, nextPage} = useAppSelector((state) => state.orderReducer);
    const [, setQuery] = useSearchParams();
    const dispatch = useAppDispatch();
    const prev = () => {
        setQuery(prev => ({...prev, page: +prev.get('page')-1}));
    };
    const next = async () => {
        setQuery(next => ({...next, page: +next.get('page')+1}));
        await dispatch(userActions.getAll({page: nextPage.toString()}))
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
