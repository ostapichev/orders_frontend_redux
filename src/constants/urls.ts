const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const comments = 'comments';

const urls = {
    orderAPI: {
        orders,
        byID: (id: string): string => `${orders}/${id}`,
        comments: (id: string): string => `${orders}/${id}/${comments}`
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
