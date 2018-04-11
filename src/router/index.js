import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from 'views/index'
import usercenter from 'views/usercenter'
import phoneRecharge from 'views/serviceCenter/phoneRecharge'
import innovtetrade from 'views/tradepage/innovte'
import tradingtrade from  'views/tradepage/traditiontrade'
import regestpassword from  'views/regest'


export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
      meta:{
        title:"找币网(zhaobi.com) – 基于区块链底层的数字资产交易平台,支持比特币,以太坊,比特元等交易"
      }
    },
    {
      path: '/index',
      component: function(resolve){
        _hmt.push(['_trackPageview', '/index']);
        require(['views/index'],resolve)
      }
    },
    {
      path: '/regestpassword',
      component: regestpassword,
    },
    {
      path: '/usercenter',
      component: usercenter,
      children: [
        {
          path:'phoneRecharge',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/phoneRecharge']);
            require(['views/serviceCenter/phoneRecharge'],resolve)
          }
        },
        {
          path: 'ethtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/ethtrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'etctrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/etctrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'sctrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/sctrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
         {
          path: 'zectrade',
          component: function(resolve){
             _hmt.push(['_trackPageview', '/usercenter/zectrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'btstrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btstrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'ltctrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/ltctrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },{
          path: 'bcctrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/bcctrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },{
          path: 'btyUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btyUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'yccUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/yccUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'btcUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btcUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'bccUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/bccUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'ethUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/ethUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'etcUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/etcUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'zecUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/zecUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'ltcUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/ltcUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'btsUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btsUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'scUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/scUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'btcsUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btcsUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },{
          path: 'dcrUSDTtrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/dcrUSDTtrade']);
            require(['views/trade/coin-usdt'],resolve)
          }
        },
        {
          path: 'btytrade',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/btytrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'btctrade',
          component: function(resolve){
             _hmt.push(['_trackPageview', '/usercenter/btctrade']);
            require(['views/trade/bty-trade'],resolve)
          }
        },
        {
          path: 'subBTCtrade',
          component: function(resolve){
             _hmt.push(['_trackPageview', '/usercenter/subBTCtrade']);
            require(['views/trade/subscription-trade'],resolve)
          }
        },
        {
          path: 'subETHtrade',
          component: function(resolve){
             _hmt.push(['_trackPageview', '/usercenter/subETHtrade']);
            require(['views/trade/subscription-trade'],resolve)
          }
        },
        {
          path: 'fince',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/fince']);
            require(['views/userCenter/fince'],resolve)
          }
        },
        {
          path: 'noticeSet',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/noticeSet']);
            require(['views/userCenter/noticeSet'],resolve)
          }
        },
        {
          path: 'safeset',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/safeset']);
            require(['views/userCenter/safeSet'],resolve)
          }
        },
        {
          path: 'myaccount',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/myaccount']);
            require(['views/userCenter/myAccount'],resolve)
          }
        }, 
        {
          path: 'share',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/share']);
            require(['views/userCenter/share'],resolve)
          }
        },{
          path: 'selfSettlement',
          component: function(resolve){
            _hmt.push(['_trackPageview', '/usercenter/selfSettlement']);
            require(['views/userCenter/selfSettlement'],resolve)
          }
        },
      ]
    },
    {
      path: '/innovate',
      component: function(resolve){
        _hmt.push(['_trackPageview', '/innovate']);
        require(['views/tradepage/innovte'],resolve)
      }
    },
    {
      path: '/traditional',
      component: function(resolve){
        _hmt.push(['_trackPageview', '/traditional']);
        require(['views/tradepage/traditiontrade'],resolve)
      }
    },
    {
      path:"/appload",
      component:function(resolve){
        _hmt.push(['_trackPageview', '/download']);
        require(['views/download'],resolve)
      }
    },
    {
      path:"/help",
      component:function(resolve){
        _hmt.push(['_trackPageview', '/help']);
        require(['views/helpCenter'],resolve)
      },
      children:[
        {
          path:"newhelp",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/newhelp']);
            require(['views/help/newhelp'],resolve)
          }
        },
        {
          path:"notice",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/notice']);
            require(['views/help/notice'],resolve)
          }
        },
        {
          path:"newDetaile",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/newDetaile']);
            require(['views/help/newDetaile'],resolve)
          }
        },
        {
          path:"coinIntroduce",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/coinIntroduce']);
            require(['views/help/coinIntroduce'],resolve)
          },
        },
        {
          path:"commonProblem",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/commonProblem']);
            require(['views/help/commonProblem'],resolve)
          },
        },
        {
          path:"rateDescript",
          component:function(resolve){
            _hmt.push(['_trackPageview', '/help/rateDescript']);
            require(['views/help/rateDescript'],resolve)
          },
        },
        {
          path:"feedback",
          component:function(resolve){
             _hmt.push(['_trackPageview', '/help/feedback']);
            require(['views/help/feedback'],resolve)
          },
        },
        {
          path:"risk",
          component:function(resolve){
             _hmt.push(['_trackPageview', '/help/risk']);
            require(['views/help/risk'],resolve)
          },
        }
      ],
    }
  ]
})
