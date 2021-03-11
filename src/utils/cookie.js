import Cookie from 'js-cookie';

export const getToken = () => {
  return Cookie.get('auth_key');
};

export const setToken = (token) => {
  return Cookie.set('auth_key', token, {
    expires: 3,
  });
};
