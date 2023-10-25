const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const admin = `/admin`;
const auth = '/auth';

const urls = {
    groupsAPI: {
        groups: `${groups}`,
        createOrder: (id: string): string => `${groups}/${id}/order`
    },

    ordersAPI: {
        orders: `${orders}`,
        byID: (id: string): string => `${orders}/${id}`
    },

    usersAPI: {
        users: `${users}`,
        createUser: `${admin}${users}`,
        banUser: (id: string): string => `${admin}${users}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}${users}/${id}/unban`
    },

    authAPI: {
        auth: auth,
        login: auth,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    }
};

export {
    baseURL,
    urls
};
