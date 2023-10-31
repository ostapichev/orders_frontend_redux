const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const activate = '/activate';
const admin = `/admin`;
const auth = '/auth';
const recoveryPassword = '/recovery_password';
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
        activateRequest: (token: string): string => `${auth}${activate}/${token}`,
        recoveryPasswordRequest: (token: string): string => `${auth}${recoveryPassword}/${token}`,
        activate:`${auth}${activate}`,
        recoveryPassword: `${auth}${recoveryPassword}`,
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
