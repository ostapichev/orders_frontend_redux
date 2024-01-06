import {ChangeEvent, FC} from 'react';

import {Pagination, Stack} from '@mui/material';

import {adminActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


interface IProps {
    namePage: string;
}

const PaginationApp: FC<IProps> = ({namePage}) => {
    const dispatch = useAppDispatch();
    const {totalPagesOrders, pageOrders} = useAppSelector(state => state.orderReducer);
    const {totalPagesUsers, pageUsers} = useAppSelector(state => state.adminReducer);
    const getDataPage = () => {
        if (namePage === 'homePage') {
            return [totalPagesOrders, pageOrders];
        } else if (namePage === 'adminPage') {
            return [totalPagesUsers, pageUsers];
        }
        alert('Pagination: button error');
    };
    const handlerChangePage = (event: ChangeEvent<unknown>, num: number) => {
        switch (namePage) {
            case 'homePage':
                dispatch(orderActions.setPage(num));
                break;
            case 'adminPage':
                dispatch(adminActions.setPage(num));
                break;
            default:
                alert('Pagination: name page error');
        }
    };
    const dataPage = getDataPage();

    return (
        <Stack spacing={2} sx={{marginY: 3}}>
            {(dataPage[0] > 1) && (
                <Pagination
                    count={+dataPage[0]}
                    page={+dataPage[1]}
                    onChange={handlerChangePage}
                    color="primary"
                    siblingCount={2}
                    showFirstButton
                    showLastButton
                />
            )}
        </Stack>
    );
};

export  {
    PaginationApp
};
