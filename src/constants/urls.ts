const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';

const urls = {
    orderAPI: {
        orders,
        byID: (id: string): string => `${orders}/${id}`,
    },
    groupAPI: {
        groups,
    },
    userAPI: {
        users,
    }
};

export {
    baseURL,
    urls
};
