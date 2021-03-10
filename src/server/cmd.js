/*
 * @Author: Li Hui
 * @Date: 2021-03-09 16:59:32
 * @LastEditors: Li Hui
 * @LastEditTime: 2021-03-10 15:04:50
 * @Description: 文件描述
 */

//import request from 'axios';
import request from 'umi-request';

export const powerSwitchApi = (type, open) => {
  return request('/test123/192.168.0.205:8000:admin:admin12345:0:33', {
    params: {
      param1: open ? 0 : 1,
      cmd: 'ptzctrl',
      ctrltype: type,
    },
  });
};

export const directionCtrlApi = (type, speed) => {
  return request('/test123/192.168.0.205:8000:admin:admin12345:0:33', {
    params: {
      cmd: 'ptzctrl',
      ctrltype: type,
      param1: 0,
      param2: speed,
    },
    method: 'get',
  }).then(() => {
    request('/test123/192.168.0.205:8000:admin:admin12345:0:33', {
      params: {
        cmd: 'ptzctrl',
        ctrltype: type,
        param1: 1,
        param2: speed,
      },
    });
  });
};
