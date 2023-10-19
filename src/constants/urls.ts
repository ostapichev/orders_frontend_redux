const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const admin = `/admin${users}`;
const params = {
    order_by_id: '?order_by=-id'
}

const urls = {
    groupAPI: {
        groups
    },

    orderAPI: {
        orders: `${orders}${params.order_by_id}`,
        byID: (id: string): string => `${orders}/${id}`
    },

    userAPI: {
        users: `${users}${params.order_by_id}`,
        createUser: `${admin}`,
        banUser: (id: string): string => `${admin}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}/${id}/unban`
    },
};

export {
    baseURL,
    urls
};
