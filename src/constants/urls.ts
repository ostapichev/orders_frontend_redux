const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const admin = `/admin${users}`;
const order_by_id = '?order_by=-id';

const urls = {
    groupAPI: {
        groups
    },

    orderAPI: {
        orders,
        byID: (id: string): string => `${orders}/${id}`
    },

    userAPI: {
        users: `${users}${order_by_id}`,
        createUser: `${admin}`,
        banUser: (id: string): string => `${admin}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}/${id}/unban`
    },
};

export {
    baseURL,
    urls
};
