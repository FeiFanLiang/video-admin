import Cookie from 'js-cookie';
import {loginApi} from '@/server/auth';


export default {
    state:{
        token:'' || Cookie.get('auth_key')
    },
    reducers:{
        updateToken(state,{token}){
            state.token = token
        },
        clearToken(state){
            state.token = ''
        }
    },
    effects:{
        *login({payload},{call,put}){
            const data =  yield call(loginApi,payload.form);
            yield put({
                type:'updateToken',
                payload:{
                    token:data
                }
            })
        }
    }
}