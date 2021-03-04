import {extend} from 'umi-request';
import {getToken} from './cookie';
import {message} from 'antd';

const request = extend({
    timeout:10000,
    headers:{
        'Auth':getToken()
    },
    prefix:'/api'
})

//request.interceptors.request.use((url,option) => {})

request.interceptors.response.use(async (response,options) => {
    const data = await response.clone().json();
    debugger
    if(data.code === 200){
        return data.data
    }else {
        message.error(data.message);
        return Promise.reject(data.message)
    }
})

export default request;