no==============================

############环境依赖

"node": ">= 4.0.0",
"npm": ">= 3.0.0"

###########部署环境安装


分支coinToCoin是找币分支

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build------------输出文件dist文件夹,安装路劲

# build for production and view the bundle analyzer report
npm run build --report
```

# 项目结构
```javascript
.
├── README.md
├── build // vue-cli 自带的配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config  // vue-cli 自带的配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── git.sh
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── js   // js文件夹
│   │   ├── css  // css文件夹
│   │   └── img  // 图片文件夹
│   │   
│   ├── components // 公用组件
│   │   ├── xxx.vue
│   │   ├── xxx.vue
│   │   └── xxx.vue
│   │
│   ├── rouuter // 路由
│   │   └── router.js
│   │
│   └── views  // 页面
│       └── index.vue
│        
└── static

接口配置地址：src->config->api-config.js  apiUrl里面基本是几台服务器的接口地址



```

# 编码规范
使用两个空格缩进。ESLint检查js规范。[文档链接](https://github.com/feross/standard)。

# 相关文档
* [vue](https://vuefe.cn/v2/guide/)。
* [vue-router](https://router.vuejs.org/zh-cn/)。
* HTTP库采用[axios](https://github.com/mzabriskie/axios)。


############v1.0.0版本内容更新
1、bts/sc上线
2、语音验证
3、未验证状态的用户验证处理


##########v1.0.1版本内容更新
1.提币地址栏没清空问题修复

##########v1.0.2版本内容更新 2018年1月30号
1.DCR上线
2.价格控制加上
3.代理api更新
4.充币银行卡切换



