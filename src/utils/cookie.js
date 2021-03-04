import Cookie from 'js-cookie';

export const getToken = () => {
    return Cookie.get('auth_key')
}