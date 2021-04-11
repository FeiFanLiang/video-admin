import { loginApi } from '@/server/auth';
import { ImmerReducer, Effect, Subscription } from 'umi';
import { setToken, getToken } from '@/utils/cookie';

export interface globalStateType {
  token: string;
}

export interface globalModelType {
  state: globalStateType;
  reducers: {
    updateToken: ImmerReducer<globalStateType>;
    clearToken: ImmerReducer<globalStateType>;
  };
  effects: {
    login: Effect;
  };
}

const globalModel: globalModelType = {
  state: {
    token: getToken() || '',
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

export default globalModel;
