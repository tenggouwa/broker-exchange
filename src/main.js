import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import ApiConfig from "./config/api-config"
import App from './App'
import router from './router'
import './assets/css/base.css'
import 'babel-polyfill'
import VueClipboard from 'vue-clipboard2'
import VueAxios from 'vue-axios'
import('./assets/font/iconfont.css');
import VueWechatTitle from 'vue-wechat-title'
import Vuex from 'vuex'
import Store from '../src/store/store'

// 路由变化，变化title内容
router.beforeEach((to, from, next) => {
  if (to.path=='/traditional'||to.path=='/innovate'||to.path=='/usercenter/ethtrade'||
    to.path=='/usercenter/etctrade'||to.path=='/usercenter/sctrade'||to.path=='/usercenter/zectrade'
    ||to.path=='/usercenter/btstrade'||to.path=='/usercenter/ltctrade'||to.path=='/usercenter/bcctrade'
    ||to.path=='/usercenter/btytrade'||to.path=='/usercenter/btctrade'
    ||to.path=='/usercenter/btyUSDTtrade'||to.path=='/usercenter/yccUSDTtrade'
    ||to.path=='/usercenter/btcUSDTtrade'||to.path=='/usercenter/bccUSDTtrade'
    ||to.path=='/usercenter/ethUSDTtrade'||to.path=='/usercenter/etcUSDTtrade'
    ||to.path=='/usercenter/zecUSDTtrade'||to.path=='/usercenter/ltcUSDTtrade'
    ||to.path=='/usercenter/btsUSDTtrade'||to.path=='/usercenter/scUSDTtrade'
    ||to.path=='/usercenter/btcsUSDTtrade'||to.path=='/usercenter/dcrUSDTtrade') {//如果设置标题，拦截后设置标题
    // document.title = $.cookie("block_fxeesnewprice")
  }
  document.title = "找币网(zhaobi.com) – 基于区块链底层的数字资产交易平台,支持比特币,以太坊,比特元等交易";
  next();
})
Vue.use(VueWechatTitle)
Vue.use(Vuex)

var querystring = require('querystring');

Vue.prototype.extendApi = ApiConfig;
Vue.prototype.querystring=querystring;
var axios = require('axios'); 
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.use(ElementUI)

new Vue({
  store:Store,
  router,
  render: h => h(App)
}).$mount('#app')
