import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd:{
    dark:true
  },
  routes: [
    {path:'/login',component:'@/pages/login'},
    {path:'/',component:'@/layout/index'},
  ],
  dva:{
    immer:true
  },
  proxy:{
    '/api':{
      target:'http://119.18.207.153:9997',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    }
  },
  fastRefresh: {},
});
