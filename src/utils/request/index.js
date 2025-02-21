import axios from 'axios'; 

const ElNotification = ()=>{
  
}

const Notify =()=>{
  
}

const logoutClear = (curRoute) => {
  

};

const server = {};

server.http = axios.create({
  // withCredentials: true,  // 允许跨域请求携带cookie
  // headers: {
  //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  // },
  // maxRedirects: 5 , // 允许最多5次重定向
  // baseURL: import.meta.env.PROD
  //   ? '/api'
  //   : import.meta.env.VITE_APP_BASE_API,
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // baseURL: '/api',
  timeout: 60 * 1000,

});

// http请求拦截
server.http.interceptors.request.use(
  function(config) {

    let user = localStorage.getItem('hezhouDeploy_rmt_storageUser') || '{}';
    
    const url = window.location.href;
    const isTesting = url.indexOf('t-hz-rmt.gxrb.com.cn') >= 0;
    if(isTesting){
       user = localStorage.getItem('hezhouProd_rmt_storageUser') || '{}';
    }

    user = JSON.parse(user);

    const token = (user?.token  || '');

    config.headers['Authorization'] = token.indexOf('Bearer') >= 0 ? token : `Bearer ${token}`;
    if (import.meta.env.DEV){
      config.headers['Authorization']  = localStorage.getItem('token')
    }
    
    return config;
  },
  function(error) {
    // 请求失败的处理
    return Promise.reject(error);
  },
);

// http响应拦截
server.http.interceptors.response.use(
  (res) => {

    if (res && res.status === 200) {
      const { data } = res || {};

      const errorCode = [400, 401, 4000, 500];

      if (data && errorCode.includes(data.code)) {
        Notify({
          title: 'error',
        });

        return Promise.reject(data);
      }

    }

    return res;
  },
  (error) => {
    // 在请求错误时要做的

    if (error.response) {
      switch (error.response.status) {
        case 401:
          Notify({
            title: '401',
            type: 'error',
            message: '登录过期，请重新登录',
          });

          logoutClear();

          break;
        case 403:
          Notify({
            title: '403',
            type: 'error',
            message: error.response?.data?.msg || error.message,
          });
          break;
        case 500:
          Notify({
            title: '500',
            type: 'error',
            message: '500',
          });
          break;
        default:
          Notify({
            title: String(error.response.status),
            type: 'error',
            message: String(error.response.status),
          });
          break;
      }
    } else if (error.message) {
      if (error.message === 'Network Error') {
        Notify({
          title: '错误',
          type: 'error',
          message: '网络连接错误，请检查网络环境！',
        });
      } else if (error.message?.indexOf('timeout') >= 0) {
        Notify({
          title: '错误',
          type: 'error',
          message: '网络连接超时，请重试！',
        });
      } else {
        Notify({
          title: '错误',
          type: 'error',
          message: error.message,
        });
      }
    } else {
      Notify({
        title: '错误',
        type: 'error',
        message: '未知错误！',
      });
    }

    return Promise.reject(error);
  },
);
export default server;
