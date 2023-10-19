const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const admin = `/admin`;
const auth = '/auth';
const params = {
    order_by_id: '?order_by=-id'
}

const urls = {
    groupsAPI: {
        groups: `${groups}`
    },

    ordersAPI: {
        orders: `${orders}${params.order_by_id}`,
        byID: (id: string): string => `${orders}/${id}`
    },

    usersAPI: {
        users: `${users}${params.order_by_id}`,
        createUser: `${admin}`,
        banUser: (id: string): string => `${admin}${users}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}${users}/${id}/unban`
    },

    authAPI: {
        auth: `${auth}/activate`
    }
};

export {
    baseURL,
    urls
};
