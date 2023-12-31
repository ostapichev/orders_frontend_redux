import {FC} from 'react';

import {Pagination, Stack} from '@mui/material';

import {adminActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


interface IProps {
    namePage: string;
}

const MyPagination: FC<IProps> = ({namePage}) => {
    const dispatch = useAppDispatch();
    const {prevPageOrders, nextPageOrders, totalPagesOrders, pageOrders} = useAppSelector(state => state.orderReducer);
    const {prevPageUsers, nextPageUsers, totalPagesUsers, pageUsers} = useAppSelector(state => state.adminReducer);
    const setPage = (num: number) => {
        dispatch(orderActions.setPage(num));
    };

    return (
        <Stack spacing={2}>
            {(nextPageOrders || prevPageOrders) && (
                <Pagination
                    count={totalPagesOrders}
                    page={pageOrders}
                    onChange={(_, num) => setPage(num)}
                    color="primary"
                    siblingCount={5}
                />
            )}
        </Stack>
    );
};

export  {
    MyPagination
};
