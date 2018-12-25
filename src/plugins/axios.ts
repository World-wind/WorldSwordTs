import Vue, { PluginObject } from 'vue';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  baseURL: 'https://easy-mock.com/mock/5c0e283020e3956ecb888792/',
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const Axios: AxiosInstance = axios.create(config);

Axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    return res;
  },
  (err) => {
    // Do something with response error
    return Promise.reject(err);
  },
);

const Plugin: PluginObject<any> = {
  install: (vueInstance) => {
    vueInstance.$axios = Axios;
  },
};
Plugin.install = (vueInstance) => {
  vueInstance.$axios = Axios;
  window.axios = Axios;
  Object.defineProperties(vueInstance.prototype, {
    $axios: {
      get() {
        return Axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
