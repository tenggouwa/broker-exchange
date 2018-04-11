import axios from 'axios'
import {getcookie} from '../../assets/js/common.js'
import ApiConfig from '../../config/api-config.js'

// document.cookie="zhaobi_token="+'8854916769de42e206e8590323054925fcaf67e7';
//这一步会影响axios后期的请求
axios.defaults.headers.get['Authorization']='Bearer ' + getcookie('zhaobi_token'),
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Authorization']='Bearer ' + getcookie('zhaobi_token'),
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = ApiConfig.getbaseUrl;
// var extend = {
//   'Account': "https://dev407.33.cn/api/Account/Asset",//用户资产
// }

var token = getcookie('zhaobi_token');

// post方法
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(response => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

// get方法
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params:param
    })
    .then(response => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

export default {
  // 获取首页ticker数据
  mineTickerData(param) {
    return fetchGet('/api/data/Ticker',param);
  },
  commonApi(url, params) {
    return fetch(url, params)
  },

}