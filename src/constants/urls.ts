const baseURL = 'http://localhost:8000/api';
const orders = '/orders';
const groups = '/groups';
const users = '/users';
const activate = '/activate';
const admin = `/admin`;
const auth = '/auth';
const comments = '/comments'
const recoveryPassword = '/recovery_password';
const statistic = '/statistic';
const urls = {
    groupsAPI: {
        groups: `${groups}`,
        createOrder: (id: string): string => `${groups}/${id}/order`
    },

    ordersAPI: {
        orders: `${orders}`,
        createExel: `${orders}/exel`,
        byID: (id: string): string => `${orders}/${id}`
    },

    usersAPI: {
        users: `${users}`
    },

    adminAPI: {
        createUser: `${admin}${users}`,
        orderStatistic: `${admin}${statistic}${orders}`,
        userStatistic: (id: string): string => `${admin}${statistic}${users}/${id}`,
        banUser: (id: string): string => `${admin}${users}/${id}/ban`,
        unbanUser: (id: string): string => `${admin}${users}/${id}/unban`,
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
    },

    commentsApi: {
        createComment: (id: string): string => `${orders}/${id}${comments}`
    }
};

export {
    baseURL,
    urls
};
