import { loginApi } from '@/server/auth';
import { setToken, getToken } from '@/utils/cookie';

export default {
  state: {
    token: '' || getToken(),
  },
  reducers: {
    updateToken(state, { payload }) {
      const { token } = payload;
      state.token = token;
      setToken(token);
    },
    clearToken(state) {
      state.token = '';
      setToken('');
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(loginApi, payload.form);
      yield put({
        type: 'updateToken',
        payload: {
          token: data,
        },
      });
    },
  },
};
