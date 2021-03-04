import request from '@/utils/request';

export const loginApi = (params) => {
    return request('/Video/Login',{
        params
    })
}