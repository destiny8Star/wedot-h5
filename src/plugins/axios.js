"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'qs'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: '/qq',
  // baseURL: process.env.NODE_ENV === 'production' ? 'https://product.dianjishenghuo.cn': '/qq', // api 的 base_url
  baseURL: process.env.NODE_ENV === 'production' ? 'https://product.weidianlingshou.com': '/qq',
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// _axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error 
//     return Promise.reject(error);
//   }
// );

_axios.interceptors.request.use(
  config => {
    if (config.method == 'post') {
      config.data = {
        ...config.data,
        timestamp: Date.parse(new Date()),
        deviceType:"3",
      }
      config.data = qs.stringify(config.data);

    } 
    return config
  }, function (error) {
    return Promise.reject(error)
  }
) 
// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
