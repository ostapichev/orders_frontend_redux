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
    const buttonDisabled = () => {
        if (namePage === 'homePage') {
            return [prevPageOrders, nextPageOrders, totalPagesOrders, pageOrders];
        } else if (namePage === 'adminPage') {
            return [prevPageUsers, nextPageUsers, totalPagesUsers, pageUsers];
        }
        console.error('disabled pagination button error');
    };
    const setPage = (num: number) => {
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
    const disabled = buttonDisabled();
    console.log(disabled);

    return (
        <Stack spacing={2} sx={{marginY: 3}}>
            {(disabled[0] || disabled[1]) && (
                <Pagination
                    count={+disabled[2]}
                    page={+disabled[3]}
                    onChange={(_, num) => setPage(num)}
                    color="primary"
                    siblingCount={5}
                    showFirstButton
                    showLastButton
                />
            )}
        </Stack>
    );
};

export  {
    MyPagination
};
