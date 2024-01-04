import {FC} from 'react';

import {Pagination, Stack} from '@mui/material';

import {adminActions, commentActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


interface IProps {
    namePage: string;
}

const MyPagination: FC<IProps> = ({namePage}) => {
    const dispatch = useAppDispatch();
    const {totalPagesOrders, pageOrders} = useAppSelector(state => state.orderReducer);
    const {totalPagesUsers, pageUsers} = useAppSelector(state => state.adminReducer);
    const {totalPageComments, pageComments, comments} = useAppSelector(state => state.commentReducer);
    const getDataPage = () => {
        if (namePage === 'homePage') {
            return [totalPagesOrders, pageOrders];
        } else if (namePage === 'adminPage') {
            return [totalPagesUsers, pageUsers];
        } else if (namePage === 'comments') {
            console.log(comments);
            if (comments) {
                const countPages: number = Math.ceil( comments.length / 3);
                console.log(countPages);
                dispatch(commentActions.setTotalPages(countPages));
            }
            return [totalPageComments, pageComments];
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
            case 'comments':
                dispatch(commentActions.setPage(num));
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
                    onChange={(_, num) => setPage(num)}
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
    MyPagination
};
